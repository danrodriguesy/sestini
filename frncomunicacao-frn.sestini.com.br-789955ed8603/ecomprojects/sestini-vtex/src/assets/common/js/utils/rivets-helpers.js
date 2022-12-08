/**
 * Custom Rivets Formatters
 */
rivets.formatters.leneq = function (target, value) {
  if (!rivets.formatters.toBoolean(target)) {
    return true;
  }

  return rivets.formatters.toArray(target).length === value;
};

rivets.formatters.lengt = function (target, value) {
  if (!rivets.formatters.toBoolean(target)) {
    return true;
  }

  return rivets.formatters.toArray(target).length > value;
};

rivets.formatters.lengte = function (target, value) {
  if (!rivets.formatters.toBoolean(target)) {
    return true;
  }

  return rivets.formatters.toArray(target).length >= value;
};

rivets.formatters.lenlt = function (target, value) {
  if (!rivets.formatters.toBoolean(target)) {
    return true;
  }

  return rivets.formatters.toArray(target).length < value;
};

rivets.formatters.lenlte = function (target, value) {
  if (!rivets.formatters.toBoolean(target)) {
    return true;
  }

  return rivets.formatters.toArray(target).length <= value;
};
