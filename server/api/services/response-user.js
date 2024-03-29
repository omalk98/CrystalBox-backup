import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';
import { hash } from 'bcrypt';
import { Gateway } from '../models/index.js';
import { weekdays, months } from '../utilities/index.js';

export function responseUser(user, user_details) {
  return {
    user_details: {
      isEditable: true,
      details: {
        first_name: user_details.first_name,
        last_name: user_details.last_name,
        username: user.username,
        email: user.email
      }
    },
    security_details: {
      isEditable: false,
      details: {
        id: user._id
      }
    },
    personal_details: {
      isEditable: true,
      details: {
        date_of_birth: user_details.date_of_birth,
        phone: user_details.phone,
        address: user_details.address
      },
      user_image: user_details.image
    }
  };
}

export function detailedResponseUser(user, user_details) {
  const basic_details = responseUser(user, user_details);
  return {
    ...basic_details,
    server_details: {
      isEditable: false,
      details: {
        roles: user.roles,
        status: user.status,
        date_joined: user.date_joined,
        last_login: user.last_login
      }
    }
  };
}

export function responseUserList(users) {
  return users.map((user) => ({
    id: user._id,
    username: user.username,
    roles: user.roles,
    activated: user.status.activated ? 'Yes' : 'No',
    locked: user.status.locked ? 'Yes' : 'No',
    email: user.email,
    date_joined: user.date_joined
  }));
}

export async function databaseUserResponse(user) {
  const newID = uuid();

  return {
    user: {
      _id: newID,
      username: user.user_details.username,
      email: user.user_details.email,
      roles: ['USER'],
      last_login: {
        time: Date.now(),
        ip: '192.168.1.1'
      },
      status: {
        activated: true,
        locked: false
      }
    },
    user_details: {
      _id: newID,
      first_name: user.user_details.first_name,
      last_name: user.user_details.last_name,
      date_of_birth: new Date(),
      phone: user.personal_details.phone,
      address: {
        street: '9481 Harvey Avenue',
        city: 'Guelph',
        province: 'SK',
        postal_code: 'Y8K 9O8',
        country: 'Canada'
      },
      image:
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
    },
    password: {
      _id: newID,
      hash: await hash(faker.internet.password(), 10)
    }
  };
}

export function parseGatewayData(data) {
  return data.map((record) => ({
    id: record._id,
    gateway: record.gateway,
    access_date: record.access_date,
    key: record.key,
    user_id: record.user_id,
    name: `${record?.details?.first_name || 'unknown'} ${
      record?.details?.last_name || ''
    }`,
    username: record?.user?.username || 'unknown',
    email: record?.user?.email || 'unknown',
    roles: record?.user?.roles || ['unknown'],
    code: record.code,
    description: record.description
  }));
}

export const NoExtraUser_ID = {
  __v: 0,
  'status._id': 0,
  'last_login._id': 0
};

export const NoExtraUserDetails_ID = {
  __v: 0,
  'address._id': 0
};

export const GatewayAccess_Lookup = [
  {
    $lookup: {
      from: 'users',
      localField: 'user_id',
      foreignField: '_id',
      as: 'user'
    }
  },
  {
    $unwind: { path: '$user', preserveNullAndEmptyArrays: true }
  },
  {
    $project: {
      __v: 0,
      'user._id': 0,
      'user.__v': 0,
      'user.status': 0,
      'user.last_login': 0,
      'user.date_joined': 0
    }
  },
  {
    $lookup: {
      from: 'user_details',
      localField: 'user_id',
      foreignField: '_id',
      as: 'details'
    }
  },
  {
    $unwind: { path: '$details', preserveNullAndEmptyArrays: true }
  },
  {
    $project: {
      __v: 0,
      'details._id': 0,
      'details.__v': 0,
      'details.address': 0,
      'details.image': 0,
      'details.date_of_birth': 0,
      'details.phone': 0
    }
  }
];

export const Analytics_Lookup = (date, period) => {
  let group_by = {};
  switch (period) {
    case 'daily':
      group_by = {
        gateway: '$gateway'
      };
      break;
    case 'weekly':
      group_by = {
        gateway: '$gateway',
        access_date: { $dayOfWeek: '$access_date' }
      };
      break;
    case 'annual':
      group_by = {
        gateway: '$gateway',
        access_date: { $month: '$access_date' }
      };
      break;
    default:
      group_by = {
        gateway: '$gateway'
      };
  }
  return [
    {
      $match: {
        access_date: {
          $gte: date
        }
      }
    },
    {
      $group: {
        _id: group_by,
        count: { $sum: 1 }
      }
    }
  ];
};

export const parseAnalyticsData = async (
  daily_data,
  weekly_data,
  annual_data
) => {
  const gateways = await Gateway.find({}, { _id: 1 }).sort({ _id: 1 });

  const daily_dataset = gateways.map((gateway) => {
    const record = daily_data.find((rec) => rec._id.gateway === gateway._id);
    return record ? record.count : 0;
  });

  const weekly_dataset = gateways.map((gateway) => {
    const records = weekly_data.filter(
      (rec) => rec._id.gateway === gateway._id
    );
    const week_arr = weekdays.map(({ num }) => {
      const record = records.find((rec) => rec._id.access_date === num);
      return record ? record.count : 0;
    });
    return { label: gateway._id, dataset: week_arr };
  });

  const annual_dataset = gateways.map((gateway) => {
    const records = annual_data.filter(
      (rec) => rec._id.gateway === gateway._id
    );
    const month_arr = months.map(({ num }) => {
      const record = records.find((rec) => rec._id.access_date === num);
      return record ? record.count : 0;
    });
    return { label: gateway._id, dataset: month_arr };
  });

  return {
    daily: {
      labels: gateways.map((gateway) => gateway._id),
      datasets: [
        {
          dataset: daily_dataset,
          label: 'Gate Usage'
        }
      ]
    },
    weekly: {
      labels: weekdays.map((day) => day.name),
      datasets: weekly_dataset
    },
    annual: {
      labels: months.map((month) => month.name),
      datasets: annual_dataset
    }
  };
};
