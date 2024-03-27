 $(> db/tests.sqlite) 
 
 cat db/migrate.sql | sqlite3 db/db1.sqlite

echo 'ok'