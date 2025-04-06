-- Create Users table
CREATE TABLE Users (
    ID INTEGER PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE,
    name VARCHAR(50),
    surname VARCHAR(50),
    birthdate DATE
);

-- Create Level table
CREATE TABLE Level (
    ID INTEGER PRIMARY KEY,
    FID_Users INTEGER,
    TotalXP INTEGER,
    FOREIGN KEY (FID_Users) REFERENCES Users(ID)
);


-- Create RewardTypes table
CREATE TABLE RewardTypes (
    ID INTEGER PRIMARY KEY,
    type VARCHAR(50)
);

-- Create Rewards table
CREATE TABLE Rewards (
    ID INTEGER PRIMARY KEY,
    FID_RewardTypes INTEGER,
    Name VARCHAR(100),
    Description TEXT,
    FOREIGN KEY (FID_RewardTypes) REFERENCES RewardTypes(ID)
);

-- Create Tasks table
CREATE TABLE Tasks (
    ID INTEGER PRIMARY KEY,
    FID_Users INTEGER,
    FID_Rewards INTEGER,
    Boss BOOLEAN,
    title VARCHAR(100),
    descr TEXT,
    XP INTEGER,
    FOREIGN KEY (FID_Users) REFERENCES Users(ID),
    FOREIGN KEY (FID_Rewards) REFERENCES Rewards(ID)
);

-- Create Friends table
CREATE TABLE Friends (
    ID INTEGER PRIMARY KEY,
    FID_Users_A INTEGER,
    FID_Users_B INTEGER,
    FOREIGN KEY (FID_Users_A) REFERENCES Users(ID),
    FOREIGN KEY (FID_Users_B) REFERENCES Users(ID)
);

-- Create Roles table
CREATE TABLE Roles (
    ID INTEGER PRIMARY KEY,
    name VARCHAR(50),
    description TEXT,
    special_effects JSON
);

-- Create UserRoles table
CREATE TABLE UserRoles (
    ID INTEGER PRIMARY KEY,
    FID_Users INTEGER,
    FID_Roles INTEGER,
    assigned_date DATE,
    FOREIGN KEY (FID_Users) REFERENCES Users(ID),
    FOREIGN KEY (FID_Roles) REFERENCES Roles(ID)
);

-- Create Achievements table
CREATE TABLE Achievements (
    ID INTEGER PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    XPBoostPercent DECIMAL(5,2),
    icon VARCHAR(255)
);

-- Create UserAchievements table
CREATE TABLE UserAchievements (
    ID INTEGER PRIMARY KEY,
    FID_Users INTEGER,
    FID_Achievements INTEGER,
    date_earned DATE,
    FOREIGN KEY (FID_Users) REFERENCES Users(ID),
    FOREIGN KEY (FID_Achievements) REFERENCES Achievements(ID)
);

-- Create TaskProofTypes table
CREATE TABLE TaskProofTypes (
    ID INTEGER PRIMARY KEY,
    type VARCHAR(50)
);

-- Create TaskRequirements table
CREATE TABLE TaskRequirements (
    ID INTEGER PRIMARY KEY,
    FID_Tasks INTEGER,
    FID_TaskProofTypes INTEGER,
    optional BOOLEAN,
    FOREIGN KEY (FID_Tasks) REFERENCES Tasks(ID),
    FOREIGN KEY (FID_TaskProofTypes) REFERENCES TaskProofTypes(ID)
);

-- Create Courses table
CREATE TABLE Courses (
    ID INTEGER PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    icon VARCHAR(255)
);

-- Create CourseTasks table
CREATE TABLE CourseTasks (
    ID INTEGER PRIMARY KEY,
    FID_Courses INTEGER,
    FID_Tasks INTEGER,
	"order" INTEGER,
    FOREIGN KEY (FID_Courses) REFERENCES Courses(ID),
    FOREIGN KEY (FID_Tasks) REFERENCES Tasks(ID)
);

-- Create UserCosmetics table
CREATE TABLE UserCosmetics (
    ID INTEGER PRIMARY KEY,
    FID_Users INTEGER,
    FID_Rewards INTEGER,
    isEquipped BOOLEAN,
    FOREIGN KEY (FID_Users) REFERENCES Users(ID),
    FOREIGN KEY (FID_Rewards) REFERENCES Rewards(ID)
);
