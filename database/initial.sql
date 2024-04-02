CREATE DATABASE IF NOT EXISTS school_management_system;
USE school_management_system;

CREATE TABLE Schools (
    school_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(50)
);

CREATE TABLE Teachers (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    school_id INT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (school_id) REFERENCES Schools(school_id)
);

CREATE TABLE Pupils (
    pupil_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES Classes(class_id)
);

CREATE TABLE Caregivers (
    caregiver_id INT AUTO_INCREMENT PRIMARY KEY,
    school_id INT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (school_id) REFERENCES Schools(school_id)
);

CREATE TABLE Pupil_Caregiver (
    pupil_id INT,
    caregiver_id INT,
    PRIMARY KEY (pupil_id, caregiver_id),
    FOREIGN KEY (pupil_id) REFERENCES Pupils(pupil_id),
    FOREIGN KEY (caregiver_id) REFERENCES Caregivers(caregiver_id)
);

CREATE TABLE Classes (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    school_id INT,
    name VARCHAR(255) NOT NULL,
    teacher_id INT,
    FOREIGN KEY (school_id) REFERENCES Schools(school_id),
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id)
);

CREATE TABLE DiscussionBoards (
    board_id INT AUTO_INCREMENT PRIMARY KEY,
    class_id INT,
    title VARCHAR(255) NOT NULL,
    FOREIGN KEY (class_id) REFERENCES Classes(class_id)
);

CREATE TABLE Posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    board_id INT,
    author_id INT,
    author_type VARCHAR(10),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (board_id) REFERENCES DiscussionBoards(board_id),
    INDEX author_index (author_id, author_type) -- 创建组合索引
);

