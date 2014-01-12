"use strict";

var fs = require('fs'),
    path = require('path');

function readdir(dir, ext, callback) {
  var list = []

  fs.readdir(dir, function (err, files) {
    if (err) {
      return callback(err)
    }

    var pending = files.length
    if (!pending) {
      // we are done, woop woop
      return callback(null, list)
    }

    files.forEach(function (file) {
      fs.stat(dir + '/' + file, function (err, stats) {
        if (err) {
          return callback(err)
        }

        if (stats.isDirectory()) {
          files = readdir(dir + '/' + file, ext, function (err, res) {
            list = list.concat(res)
            pending -= 1
            if (!pending) {
              callback(null, list)
            }
          })
        }
        else {
          var detail = {};
          detail.name = file;
          detail.path = dir;
          detail.fullname = dir + '/' + file;
          detail.ext = path.extname(file);
          detail.size = stats.size;
          if(ext.indexOf(detail.ext)!=-1){
              list.push(detail)
          }
          pending -= 1
          if (!pending) {
            callback(null, list)
          }
        }
      })
    })
  })
}

module.exports = readdir