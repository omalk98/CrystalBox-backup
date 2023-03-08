const AppleDeviceReducer = (
  state = navigator?.userAgent?.match(/iPhone|iPad|iPod|Safari/i)
) => state;

export default AppleDeviceReducer;
