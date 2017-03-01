/**
 * Define utility javascript functions here. These can be called from Typescript
 * code.
 */

/*
 * moment-timezone js library which returns the formatted date. Pass in date :
 * milliseconds, locale : string, format : string
 */
getDate = function(date, locale, format) {
  if (locale == null) {
    locale = moment.tz.guess();
  }
  if (format == null) {
    return moment(date).tz(moment.tz.guess());
  } else {
    return moment(date).tz(moment.tz.guess()).format(format);
  }
}

getUTCDate = function() {
  return moment.utc().format();
}

getUTCDateLess = function(number, string) {
  return moment.utc().subtract(number, string).format();
}
