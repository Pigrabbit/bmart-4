use mart;

CREATE TABLE IF NOT EXISTS user (
  id bigint PRIMARY KEY AUTO_INCREMENT,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  google_id varchar(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS product (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(100) NOT NULL DEFAULT '',
    coupang_product_id int(20) NOT NULL,
    category varchar(20) NOT NULL DEFAULT '',
    price int(20) NOT NULL DEFAULT '0',
    base_price int(20) DEFAULT NULL,
    discount_rate int(4) DEFAULT NULL,
    thumbnail_src varchar(255) NOT NULL DEFAULT '',
    created_at datetime default NOW(),
    stock_count int(10) DEFAULT 1000,
    sold_count int(10) DEFAULT 0,
    `description` text default NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `order` (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    user_id bigint,
    ordered_at datetime NOT NULL DEFAULT NOW(),
    FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_product (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    order_id bigint,
    product_id bigint,
    quantity int(10) NOT NULL DEFAULT 0,
    price_sum int(20) NOT NULL DEFAULT 0,
    FOREIGN KEY(order_id) REFERENCES `order`(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(product_id) REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS wishlist (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    user_id bigint,
    product_id bigint,
    FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(product_id) REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS search_history (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    content varchar(255) NOT NULL,
    user_id bigint,
    searched_at DATETIME NOT NULL DEFAULT NOW(),
    is_deleted TINYINT NOT NULL DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS product_detail_image (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    coupang_product_id int(20),
    img_src varchar(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS product_detail_image_copy (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    coupang_product_id int(20),
    img_src varchar(255) NOT NULL
) ENGINE=InnoDB;
