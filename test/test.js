'use strict';
var chai = require('chai');
var expect = chai.expect;
var isGitlabUrl = require('../index.js');
var options;

var userUrls = [
  'https://gitlab.com/facebook',
  'https://gitlab.com/facebook/'
];

var plainGhURLs = [
  'https://gitlab.com/'
];

var repoUrls = [
  'https://gitlab.com/facebook/react',
  'https://gitlab.com/facebook/react',
  'https://gitlab.com/facebook/_re.act/'
];

var expandedUrls = [
  'https://gitlab.com/facebook/react/tree/0.14-stable',
  'https://gitlab.com/facebook/react/releases/tag/v0.14.0',
  'https://gitlab.com/alferov/awesome-gulp/blob/master/.gitignore#L2',
  'https://gitlab.com/alferov/is-gitlab-url/pulls?q=is%3Apr+is%3Aclosed'
];

var cloningUrls = [
  'git://gitlab.com/facebook/react.git#gh-pages',
  'git@gitlab.com:facebook/react.git',
  // 'git@gitlab.com:facebook/react',
  'https://gitlab.com/facebook/react.git',
  // 'https://gitlab.com/facebook/react',
  'git://gitlab.com:user/some_project.git.git'
];

var invalidUrls = [
  'gitlab.com/',
  'gitlab.com/facebook/react',
  'www.gitlab.com/facebook/react',
  'google.com',
  'https://google.com',
  'https://hello.gitlab.com',
  'unknown://gitlab.com',
  'http://facebook.gitlab.io/',
  'git@gitlab.com:facebook/react.git/foo',
  'git@gitlab.com:user/some_project.gitfoo',
  'git://gitlab.com:user/some_project.gitfoo',
  'git://gitlab.com:user/some_project',
  'git@gitlab.com:facebook/react/facebook.git',
  'git@gitlab.com:facebook/react/facebook.git/',
  'https://gitlab.com/faceb@ok',
  'https://gitlab.com/face_book',
  'https://gitlab.com:alferov/awesome-gulp#gh-pages/',
  'https://gitlab.com/facebook/react/.git'
];

describe('is-gitlab-url', function() {
  describe('with a standard set of options', function() {

    plainGhURLs.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be valid', function() {
        expect(isGitlabUrl(url)).to.be.true;
      });
    });

    repoUrls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be valid', function() {
        expect(isGitlabUrl(url)).to.be.true;
      });
    });

    expandedUrls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be valid', function() {
        expect(isGitlabUrl(url)).to.be.true;
      });
    });

    userUrls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be valid', function() {
        expect(isGitlabUrl(url)).to.be.true;
      });
    });

    cloningUrls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be valid', function() {
        expect(isGitlabUrl(url)).to.be.true;
      });
    });

    invalidUrls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be invalid', function() {
        expect(isGitlabUrl(url)).to.be.false;
      });
    });

  });

  describe('with enabled strict mode', function() {

    before(function() {
      options = { strict: true };
    });

    plainGhURLs.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be invalid', function() {
        expect(isGitlabUrl(url, options)).to.be.false;
      });
    });

    repoUrls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be invalid', function() {
        expect(isGitlabUrl(url, options)).to.be.false;
      });
    });

    expandedUrls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be invalid', function() {
        expect(isGitlabUrl(url, options)).to.be.false;
      });
    });

    userUrls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be invalid', function() {
        expect(isGitlabUrl(url, options)).to.be.false;
      });
    });

    cloningUrls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be valid', function() {
        expect(isGitlabUrl(url, options)).to.be.true;
      });
    });

    invalidUrls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be invalid', function() {
        expect(isGitlabUrl(url, options)).to.be.false;
      });
    });

  });

  describe('with enabled repository mode', function() {

    before(function() {
      options = { repository: true };
    });

    plainGhURLs.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be invalid', function() {
        expect(isGitlabUrl(url, options)).to.be.false;
      });
    });

    repoUrls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be valid', function() {
        expect(isGitlabUrl(url, options)).to.be.true;
      });
    });

    expandedUrls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be invalid', function() {
        expect(isGitlabUrl(url, options)).to.be.false;
      });
    });

    userUrls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be invalid', function() {
        expect(isGitlabUrl(url, options)).to.be.false;
      });
    });

    cloningUrls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be valid', function() {
        expect(isGitlabUrl(url, options)).to.be.true;
      });
    });

    invalidUrls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be invalid', function() {
        expect(isGitlabUrl(url, options)).to.be.false;
      });
    });

  });
});
