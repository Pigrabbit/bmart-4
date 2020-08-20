INSERT INTO `product_detail_image_copy`
SELECT * FROM `product_detail_image`
GROUP BY img_src;

DROP TABLE product_detail_image;

ALTER TABLE product_detail_image_copy RENAME TO product_detail_image;