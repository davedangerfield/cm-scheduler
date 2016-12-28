export const enum ActivityType {
	'AT',
	'PLUS',
	'MINUS',
	'BLANK'
}

export function activityTypeFromSymbol(symbol) :ActivityType {

  var activityTypeSymbolMap = {
    ['']: ActivityType.BLANK,
    ['-']: ActivityType.MINUS,
    ['+']: ActivityType.PLUS,
    ['@']: ActivityType.AT,
  }
  return activityTypeSymbolMap[symbol];
}