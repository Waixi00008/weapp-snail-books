/* 创建books数据表 */
create table books (
  id int not null auto_increment primary key,
  isbn varchar(20) not null,
  openid varchar(50) not null,
  title varchar(100) not null,
  imageUrl varchar(100),
  alt varchar(100) not null,
  publisher varchar(100) not null,
  summary varchar(3000) not null,
  price varchar(100),
  rate float,
  tags varchar(100),
  author varchar(100),
  count int default 0,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
