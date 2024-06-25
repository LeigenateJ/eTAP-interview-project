DROP DATABASE IF EXISTS school_management_system;
CREATE DATABASE IF NOT EXISTS school_management_system;
USE school_management_system;

CREATE TABLE Schools (
    school_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Teachers (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    school_id INT,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (school_id) REFERENCES Schools(school_id)
);

CREATE TABLE Classrooms (
    classroom_id INT AUTO_INCREMENT PRIMARY KEY,
    school_id INT,
    name VARCHAR(255) NOT NULL,
    teacher_id INT,
    FOREIGN KEY (school_id) REFERENCES Schools(school_id),
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id)
);

CREATE TABLE Pupils (
    pupil_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    classroom_id INT,
    FOREIGN KEY (classroom_id) REFERENCES Classrooms(classroom_id)
);

CREATE TABLE Caregivers (
    caregiver_id INT AUTO_INCREMENT PRIMARY KEY,
    school_id INT,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
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

CREATE TABLE DiscussionBoards (
    board_id INT AUTO_INCREMENT PRIMARY KEY,
    classroom_id INT,
    title VARCHAR(255) NOT NULL,
    FOREIGN KEY (classroom_id) REFERENCES Classrooms(classroom_id)
);

CREATE TABLE Posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    board_id INT,
    title VARCHAR(255) NOT NULL,
    author_id INT,
    author_type VARCHAR(10),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    parent_post_id INT, 
    FOREIGN KEY (board_id) REFERENCES DiscussionBoards(board_id),
    FOREIGN KEY (parent_post_id) REFERENCES Posts(post_id),
    INDEX author_index (author_id, author_type)
);

INSERT INTO Schools (name, username, password) VALUES 
('Greenwood Primary', 'greenwood', 'securepass'),
('Lakeside Middle', 'lakeside', 'securepass');

INSERT INTO Teachers (school_id, name, username, password) VALUES 
(1, 'John Doe', 'johnd', 'pass123'),
(1, 'Jane Smith', 'janes', 'pass123'),
(1, 'Jim Bean', 'jimb', 'pass123'),
(2, 'Sarah Brown', 'sarahb', 'pass123'),
(2, 'Sam Blue', 'samb', 'pass123'),
(2, 'Sue Grey', 'sueg', 'pass123');

INSERT INTO Classes (school_id, name, teacher_id) VALUES 
(1, '1A', 1),
(1, '1B', 2),
(1, '2A', 3),
(1, '2B', 1),
(1, '3A', 1),
(2, '1A', 4),
(2, '2A', 5),
(2, '3A', 6);

INSERT INTO Pupils (name, class_id) VALUES 
('Student 1', 1),
('Student 2', 1),
('Student 3', 1),
('Student 4', 1),
('Student 5', 1),
('Student 6', 2),
('Student 7', 3),
('Student 8', 4),
('Student 9', 5),
('Student 10', 6),
('Student 11', 7),
('Student 12', 8);

INSERT INTO Caregivers (school_id, name, username, password) VALUES 
(1, 'Parent 1', 'parent1', 'pass123'),
(1, 'Parent 2', 'parent2', 'pass123'),
(1, 'Parent 3', 'parent3', 'pass123'),
(1, 'Parent 4', 'parent4', 'pass123'),
(1, 'Parent 5', 'parent5', 'pass123'),
(1, 'Parent 6', 'parent6', 'pass123'),
(1, 'Parent 7', 'parent7', 'pass123'),
(1, 'Parent 8', 'parent8', 'pass123'),
(1, 'Parent 9', 'parent9', 'pass123'),
(1, 'Parent 10', 'parent10', 'pass123'),
(2, 'Parent 11', 'parent11', 'pass123'),
(2, 'Parent 12', 'parent12', 'pass123'),
(2, 'Parent 13', 'parent13', 'pass123');

INSERT INTO Pupil_Caregiver (pupil_id, caregiver_id) VALUES 
(1, 1),
(1, 10),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 11),
(11, 12),
(12, 13);