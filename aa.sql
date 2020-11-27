/*
Navicat MySQL Data Transfer

Source Server         : yyy
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : ty

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2020-09-18 11:41:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `aa`
-- ----------------------------
DROP TABLE IF EXISTS `aa`;
CREATE TABLE `aa` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL COMMENT '账号',
  `pass` varchar(20) NOT NULL COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of aa
-- ----------------------------
INSERT INTO `aa` VALUES ('6', '555', '566');
INSERT INTO `aa` VALUES ('2', '111', '456');
INSERT INTO `aa` VALUES ('4', '22', '111');
INSERT INTO `aa` VALUES ('5', '', '');
