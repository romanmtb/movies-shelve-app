import isEmpty from 'lodash.isempty';
import addDefaultImg from './addDefaultImg';

const SEMI_SEPARATOR = ': ';
const COMMA_SEPARATOR = ', ';
const WHAT_REPLACE = ' ';
const TO_REPLACE = '_';

/**
 * Method which parses .txt file into object
 * Schema of text file should be presented like:
 * 'Some key : values (values will comma separated into individual array)'
 * Objects separated by new empty line
 */
const parseTextFile = file => {
  let fileData = file.srcElement.result.split('\n');
  let combinedArray = [];
  let current = {};

  fileData.forEach(item => {
    if (item !== '') {
      let separator = item.split(SEMI_SEPARATOR);
      let key;
      if (separator[1].includes(COMMA_SEPARATOR)) {
        key = separator[0].toLowerCase();
        current[key] = separator[1].split(COMMA_SEPARATOR);
      } else {
        key = separator[0].toLowerCase().replace(WHAT_REPLACE, TO_REPLACE);
        if (separator[0] === 'Release Year') key = 'year'; //TODO: update back to remove this issue
        current[key] = separator[1];
      }
    } else {
      if (isEmpty(current)) {
        //do nothing
      } else {
        combinedArray.push(current);
        current = {};
      }
    }
  });

  addDefaultImg(combinedArray);
  return combinedArray;
};

export default parseTextFile;
