'use strict'

const plainRegex = '(?:https?\\:\\/\\/)gitlab.com\\/?$'
const autostrictRegex = 'git(@|:)|\.git(?:\/?|\\#[\d\w\.\-_]+)$'
const strictPatternRegex = '\\/[\\w\\.-]+?\\.git(?:\\/?|\\#[\\w\\.\\-_]+)?$'
const repoRequiredRegex = '\\/[\\w\\.-]+\\/?(?!=.git)(?:\\.git(?:\\/?|\\#[\\w\\.\\-_]+)?)?$'
const repoNotRequiredRegex = '(?:\\/[\\w\\.\\/-]+)?\\/?(?:#\\w+?|\\?.*)?$'
const finalPatternRegex = '(?:git|https?|git@)(?:\\:\\/\\/)?gitlab.com[/|:][A-Za-z0-9-]+?'

var isPlainGlUrl = function (string) {
  var re = new RegExp(plainRegex)
  return re.test(string)
}

// Switch to strict mode automatically if the following pattern matches passed
// string
var isStrictRequired = function (string) {
  var re = new RegExp(autostrictRegex)
  return re.test(string)
}

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
module.exports = function isGitlabUrl (url, options) {
  options = options || {}
  var isStrict = options.strict || isStrictRequired(url)
  var repoRequired = options.repository || isStrict

  var loosePattern = repoRequired ? repoRequiredRegex : repoNotRequiredRegex
  var endOfPattern = isStrict ? strictPatternRegex : loosePattern

  var pattern = finalPatternRegex + endOfPattern

  if (isPlainGlUrl(url) && !repoRequired) {
    return true
  }

  var re = new RegExp(pattern)
  return re.test(url)
}
