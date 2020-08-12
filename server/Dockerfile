FROM mysql:5.7

EXPOSE 3306

COPY ./config/utf8mb4.cnf /etc/mysql/conf.d/
COPY ./sql_scripts /docker-entrypoint-initdb.d/