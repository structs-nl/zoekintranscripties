grammar ElasticsearchGrammar;
import StandardLuceneGrammar;

// Elasticsearch extends the standard grammar.
// https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html

range_term
  :
  two_sided_range_term
  | one_sided_range_term
  ;

one_sided_range_term
  :
  op=(GT|GTE|LT|LTE)
  val=range_value
  ;

GT  : '>'  ;
GTE : '>=' ;
LT  : '<'  ;
LTE : '<=' ;
