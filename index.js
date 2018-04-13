'use strict';

const plain_regex = '(?:https?\\:\\/\\/)gitlab.com\\/?$'
const autostrict_regex = 'git(@|:)|\.git(?:\/?|\\#[\d\w\.\-_]+)$'
const strictPattern_regex = '\\/[\\w\\.-]+?\\.git(?:\\/?|\\#[\\w\\.\\-_]+)?$';
const repoRequired_regex = '\\/[\\w\\.-]+\\/?(?!=.git)(?:\\.git(?:\\/?|\\#[\\w\\.\\-_]+)?)?$'
const repoNotRequired_regex = '(?:\\/[\\w\\.\\/-]+)?\\/?(?:#\\w+?|\\?.*)?$'
const finalPattern_regex = '(?:git|https?|git@)(?:\\:\\/\\/)?gitlab.com[/|:][A-Za-z0-9-]+?'

var isPlainGlUrl = function(string) {
  var re = new RegExp(plain_regex);
  return re.test(string);
};

// Switch to strict mode automatically if the following pattern matches passed
// string
var isStrictRequired = function(string) {
  var re = new RegExp(autostrict_regex);
  return re.test(string);
};

/**
 * isGitlabUrl
 * Check if a passed string is a valid GitHub URL
 *
 * @name isGitlabUrl
 * @function
 *
 * @param {String} url A string to be validated
 * @param {Object} options An object containing the following fields:
 *  - `strict` (Boolean): Match only URLs ending with .git
 *  - `repository` (Boolean): Match only valid GitHub repo URLs
 * @return {Boolean} Result of validation
 */
module.exports = function isGitlabUrl(url, options) {
  options = options || {};
  var isStrict = options.strict || isStrictRequired(url);
  var repoRequired = options.repository || isStrict;

  var loosePattern = repoRequired ? repoRequired_regex : repoNotRequired_regex;
  var endOfPattern = isStrict ? strictPattern_regex : loosePattern;

  var pattern = finalPattern_regex + endOfPattern;

  if (isPlainGlUrl(url) && !repoRequired) {
    return true;
  }

  var re = new RegExp(pattern);
  return re.test(url);
};
