DROP DATABASE IF EXISTS products;
CREATE DATABASE products;
USE products;


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `image` (
  `id_img` int(11) NOT NULL,
  `typ_img` varchar(64) NOT NULL,
  `nam_img` varchar(128) NOT NULL,
  `dat_img` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `product` (
  `id_prd` int(11) NOT NULL,
  `nam_prd` varchar(128) NOT NULL,
  `prc_prd` varchar(64) NOT NULL,
  `num_prd` varchar(32) NOT NULL,
  `cat_prd` enum('all','electric','mechanic','construction') DEFAULT 'all',
  `fch_prd` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `image`
  ADD PRIMARY KEY (`id_img`);


ALTER TABLE `product`
  ADD PRIMARY KEY (`id_prd`);

ALTER TABLE `image`
  MODIFY `id_img` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

ALTER TABLE `product`
  MODIFY `id_prd` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;


ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`id_img`) REFERENCES `product` (`id_prd`);
COMMIT;
