DOCKER:
create db with docker -> docker run --name mines-game-db -e MYSQL_ROOT_PASSWORD=your-password -d mysql:8
start db -> docker start mines-game-db
check db status -> docker ps
send query -> docker exec -it mines-game-db mysql -u root -p
create database -> CREATE DATABASE `mines-game-db`;

LOCAL:
install mysql server -> sudo apt install mysql-server
start mysql service -> sudo service mysql start
start mysql server -> sudo systemctl start mysql
send query -> sudo mysql -u root
SETTINGS:
-> SELECT user, host, plugin, authentication_string FROM mysql.user WHERE user='root';
-> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
-> ALTER USER 'root'@'127.0.0.1' IDENTIFIED WITH mysql_native_password BY 'password';
-> FLUSH PRIVILEGES;
create database -> CREATE DATABASe `mines-game-db`;

CREATE TABLES:
CREATE TABLE users (
    accountID VARCHAR(36) PRIMARY KEY NOT NULL,
    username VARCHAR(20) DEFAULT NULL,
    score INT DEFAULT 0,
    profileURL VARCHAR(100) DEFAULT NULL
);