var query = require('../db');
var util = require('util');

var ArticleTags = _ => {}


ArticleTags.get_tags = function() {
  var sql = `SELECT any_value(b.id) as id,b.tags_name,any_value(count(a.id)) as counts FROM tp_article_tags right join
    tp_tags as b on tags_id = b.id left join tp_article as a on article_id = a.id and a.private
     <> '1'  GROUP BY tags_name ORDER BY counts desc`;
  return new Promise((resolve, reject) => {
    query(sql, (err, result) => {
      if (err) reject(err.message);
      resolve(result);
    }, true)
  })
}

ArticleTags.get_tagsName_by_articleId = function(article_id) {
  var sql = 'select tt.tags_name,tt.id from tp_article_tags as tat\
     LEFT JOIN tp_tags as tt on tt.id = tat.tags_id where article_id = ' + article_id;
  return new Promise((resolve, reject) => {
    query(sql, function(err, result) {
      if (err) reject(err);
      resolve(result);
    })
  });
}

module.exports = ArticleTags;
