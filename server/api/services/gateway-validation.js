import { NoExtraUser_ID } from './response-user.js';
import { Users, Gateway, GatewayAccess, Tag } from '../models/index.js';

export default async function gatewayValidation(gateway_id, key, uuid) {
  const access_date = new Date();
  const access_details = { gateway: gateway_id, key, uuid, access_date };

  const gateway = await Gateway.findById(gateway_id);
  if (!gateway) {
    await GatewayAccess.create({
      ...access_details,
      code: 407,
      description: 'Gateway Not Found'
    });
    throw 407;
  }
  gateway.access_count += 1;
  gateway.last_access = new Date();
  await gateway.save();

  const tag = await Tag.findById(key);
  if (!tag) {
    await GatewayAccess.create({
      ...access_details,
      code: 404,
      description: 'Tag Not Found'
    });
    throw 404;
  } else if (tag.uuid !== uuid) {
    await GatewayAccess.create({
      ...access_details,
      code: 409,
      description: 'Tag UUID Mismatch'
    });
    throw 409;
  }
  tag.access_count += 1;
  tag.last_access = new Date();
  await tag.save();

  const user = await Users.findById(tag.user_id, NoExtraUser_ID);
  if (!user) {
    await GatewayAccess.create({
      ...access_details,
      code: 401,
      description: 'User Not Found'
    });
    throw 401;
  }

  if (!user.roles.find((role) => gateway.permissions.includes(role))) {
    await GatewayAccess.create({
      ...access_details,
      user_id: user._id,
      code: 403,
      description: 'User Role Not Authorized'
    });
    throw 403;
  }

  if (user.status.deleted) {
    await GatewayAccess.create({
      ...access_details,
      user_id: user._id,
      code: 403,
      description: 'User is Deleted'
    });
    throw 403;
  }

  if (!user.status.activated) {
    await GatewayAccess.create({
      ...access_details,
      user_id: user._id,
      code: 403,
      description: 'User Not Activated'
    });
    throw 403;
  }

  if (user.status.locked) {
    await GatewayAccess.create({
      ...access_details,
      user_id: user._id,
      code: 403,
      description: 'User is Locked'
    });
    throw 403;
  }

  await GatewayAccess.create({
    ...access_details,
    user_id: user._id
  });
}
