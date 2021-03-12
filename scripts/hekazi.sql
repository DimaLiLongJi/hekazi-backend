/*
 Navicat MySQL Data Transfer

 Source Server         : 本地数据库
 Source Server Type    : MySQL
 Source Server Version : 50725
 Source Host           : localhost:3306
 Source Schema         : hekazi

 Target Server Type    : MySQL
 Target Server Version : 50725
 File Encoding         : 65001

 Date: 27/05/2020 10:30:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `create_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `creatorId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_df16ff3255e6dfc777b086949b` (`name`),
  KEY `FK_301b44a4226ae80beb0416d8831` (`creatorId`),
  CONSTRAINT `FK_301b44a4226ae80beb0416d8831` FOREIGN KEY (`creatorId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for module
-- ----------------------------
DROP TABLE IF EXISTS `module`;
CREATE TABLE `module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `create_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `delete_date` datetime DEFAULT NULL,
  `creatorId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_620a549dbcb1fff62ea85695ca` (`name`),
  KEY `FK_1a96608338d33b3b71285961206` (`creatorId`),
  CONSTRAINT `FK_1a96608338d33b3b71285961206` FOREIGN KEY (`creatorId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of module
-- ----------------------------
BEGIN;
INSERT INTO `module` VALUES (1, '权限管理', 'cluster', '2020-05-27 09:43:56.438644', '2020-05-27 09:43:56.438644', NULL, 1);
INSERT INTO `module` VALUES (2, '个人中心', 'user', '2020-05-27 09:46:07.591745', '2020-05-27 09:46:07.591745', NULL, 1);
INSERT INTO `module` VALUES (3, '需求管理', 'project', '2020-05-27 09:46:44.982163', '2020-05-27 09:46:44.982163', NULL, 1);
INSERT INTO `module` VALUES (4, '扫码中心', 'barcode', '2020-05-27 09:46:44.982163', '2020-05-27 09:46:44.982163', NULL, 1);
COMMIT;

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `route` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `operating` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `create_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `creatorId` int(11) NOT NULL,
  `type` enum('1','2') COLLATE utf8mb4_bin NOT NULL,
  `moduleId` int(11) NOT NULL,
  `delete_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_240853a0c3353c25fb12434ad3` (`name`),
  UNIQUE KEY `IDX_42ace477627f6f821f49689186` (`route`),
  UNIQUE KEY `IDX_49178e21c84645fa3a2a2cc6bb` (`operating`),
  KEY `FK_18f3ac6d3f1e3e6b5e3f8123289` (`moduleId`),
  KEY `FK_a88759d149c67ba80eee0e1e9af` (`creatorId`),
  CONSTRAINT `FK_18f3ac6d3f1e3e6b5e3f8123289` FOREIGN KEY (`moduleId`) REFERENCES `module` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_a88759d149c67ba80eee0e1e9af` FOREIGN KEY (`creatorId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of permission
-- ----------------------------
BEGIN;
INSERT INTO `permission` VALUES (1, '权限列表', '/home/permission-list', NULL, '2019-10-10 16:27:44.754727', '2020-05-27 10:28:40.000000', 1, '1', 1, NULL);
INSERT INTO `permission` VALUES (2, '角色列表', '/home/role-list', NULL, '2019-10-11 09:43:03.390693', '2019-10-15 10:26:14.000000', 1, '1', 1, NULL);
INSERT INTO `permission` VALUES (3, '用户列表', '/home/user-list', NULL, '2019-10-11 10:08:03.849477', '2020-05-27 10:28:04.000000', 1, '1', 1, NULL);
INSERT INTO `permission` VALUES (4, '个人信息', '/home/self', NULL, '2019-10-15 14:26:54.657869', '2020-05-27 09:54:50.000000', 1, '1', 2, NULL);
INSERT INTO `permission` VALUES (5, '修改个人角色和权限', NULL, 'change-self-role', '2019-10-20 22:13:00.850461', '2020-05-27 10:27:48.000000', 1, '2', 2, NULL);
INSERT INTO `permission` VALUES (6, '创建用户', NULL, 'create-user', '2020-05-30 11:43:27.538248', '2020-05-30 11:43:27.538248', 1, '2', 1, NULL);
INSERT INTO `permission` VALUES (7, '编辑用户', NULL, 'update-user', '2020-05-30 11:44:18.417886', '2020-05-30 11:44:18.417886', 1, '2', 1, NULL);
INSERT INTO `permission` VALUES (8, '重置用户密码', NULL, 'reset-user-password', '2020-06-29 14:13:28.637000', '2020-06-29 14:13:28.637000', 1, '2', 1, NULL);
INSERT INTO `permission` VALUES (9, '素材列表', '/home/material', NULL, '2020-06-29 14:13:28.637000', '2020-06-29 14:13:28.637000', 1, '1', 4, NULL);

COMMIT;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `create_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `delete_date` datetime DEFAULT NULL,
  `creatorId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ae4578dcaed5adff96595e6166` (`name`),
  KEY `FK_c9a53388d75d33751e7046f3644` (`creatorId`),
  CONSTRAINT `FK_c9a53388d75d33751e7046f3644` FOREIGN KEY (`creatorId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


-- ----------------------------
-- Table structure for role_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission` (
  `role` int(11) NOT NULL,
  `permission` int(11) NOT NULL,
  PRIMARY KEY (`role`,`permission`),
  KEY `IDX_64e5f40bfdde9ea2955ba56910` (`role`),
  KEY `IDX_8307c5c44a4ad6210b767b17a9` (`permission`),
  CONSTRAINT `FK_64e5f40bfdde9ea2955ba569109` FOREIGN KEY (`role`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_8307c5c44a4ad6210b767b17a99` FOREIGN KEY (`permission`) REFERENCES `permission` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `mobile` varchar(11) COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `salt` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `create_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `delete_date` datetime DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `creatorId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_29fd51e9cf9241d022c5a4e02e` (`mobile`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  KEY `FK_c28e52f758e7bbc53828db92194` (`roleId`),
  KEY `FK_b40ff13132b995b758b1187ee8a` (`creatorId`),
  CONSTRAINT `FK_b40ff13132b995b758b1187ee8a` FOREIGN KEY (`creatorId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_c28e52f758e7bbc53828db92194` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, '管理员', '11111111111', '11111111111@163.com', '1587023984952', 'ce5ff45b8d56f397bbb4334d11b988f7', '2019-10-03 21:37:07.831000', '2020-04-16 15:59:44.958000', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for user_permission
-- ----------------------------
DROP TABLE IF EXISTS `user_permission`;
CREATE TABLE `user_permission` (
  `user` int(11) NOT NULL,
  `permission` int(11) NOT NULL,
  PRIMARY KEY (`user`,`permission`),
  KEY `IDX_77a8596c109cd7acc7b87bb06e` (`user`),
  KEY `IDX_8c65c37ee42d48a76c0612ad0f` (`permission`),
  CONSTRAINT `FK_77a8596c109cd7acc7b87bb06ea` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_8c65c37ee42d48a76c0612ad0fe` FOREIGN KEY (`permission`) REFERENCES `permission` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of user_permission
-- ----------------------------
BEGIN;
INSERT INTO `user_permission` VALUES (1, 1);
INSERT INTO `user_permission` VALUES (1, 2);
INSERT INTO `user_permission` VALUES (1, 3);
INSERT INTO `user_permission` VALUES (1, 4);
INSERT INTO `user_permission` VALUES (1, 5);
INSERT INTO `user_permission` VALUES (1, 6);
INSERT INTO `user_permission` VALUES (1, 7);
INSERT INTO `user_permission` VALUES (1, 8);
INSERT INTO `user_permission` VALUES (1, 9);
COMMIT;

