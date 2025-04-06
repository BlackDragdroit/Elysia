### 🧍‍♂️ `Users`

| Column    | Data Type      | Notes       |
| --------- | -------------- | ----------- |
| ID        | `INTEGER`      | Primary Key |
| username  | `VARCHAR(50)`  | Unique      |
| email     | `VARCHAR(100)` | Unique      |
| name      | `VARCHAR(50)`  |             |
| surname   | `VARCHAR(50)`  |             |
| birthdate | `DATE`         |             |

---

### 🧬 `Level`

| Column    | Data Type | Notes                   |
| --------- | --------- | ----------------------- |
| ID        | `INTEGER` | Primary Key             |
| FID_Users | `INTEGER` | Foreign Key → Users(ID) |
| TotalXP   | `INTEGER` | Total experience points |

---

### ✅ `Tasks`

| Column      | Data Type      | Notes                      |
| ----------- | -------------- | -------------------------- |
| ID          | `INTEGER`      | Primary Key                |
| FID_Users   | `INTEGER`      | Foreign Key → Users(ID)    |
| FID_Rewards | `INTEGER`      | Foreign Key → Rewards(ID)  |
| Boss        | `BOOLEAN`      | True = major/boss task     |
| title       | `VARCHAR(100)` |                            |
| descr       | `TEXT`         |                            |
| XP          | `INTEGER`      | XP awarded upon completion |

---

### 🎁 `Rewards`

| Column          | Data Type      | Notes                         |
| --------------- | -------------- | ----------------------------- |
| ID              | `INTEGER`      | Primary Key                   |
| FID_RewardTypes | `INTEGER`      | Foreign Key → RewardTypes(ID) |
| Name            | `VARCHAR(100)` |                               |
| Description     | `TEXT`         |                               |

---

### 🧩 `RewardTypes`

| Column | Data Type     | Notes                     |
| ------ | ------------- | ------------------------- |
| ID     | `INTEGER`     | Primary Key               |
| type   | `VARCHAR(50)` | e.g., "cosmetic", "title" |

---

### 👥 `Friends`

| Column      | Data Type | Notes                                   |
| ----------- | --------- | --------------------------------------- |
| ID          | `INTEGER` | Primary Key                             |
| FID_Users_A | `INTEGER` | Foreign Key → Users(ID)                 |
| FID_Users_B | `INTEGER` | Foreign Key → Users(ID) (friend target) |

---

### 🧠 `Roles`

| Column          | Data Type     | Notes                            |
| --------------- | ------------- | -------------------------------- |
| ID              | `INTEGER`     | Primary Key                      |
| name            | `VARCHAR(50)` | e.g., Gamer, Leader              |
| description     | `TEXT`        |                                  |
| special_effects | `JSON`        | Optional: bonuses, UI perks etc. |

---

### 🧍‍♂️➡️🎭 `UserRoles`

| Column        | Data Type | Notes                   |
| ------------- | --------- | ----------------------- |
| ID            | `INTEGER` | Primary Key             |
| FID_Users     | `INTEGER` | Foreign Key → Users(ID) |
| FID_Roles     | `INTEGER` | Foreign Key → Roles(ID) |
| assigned_date | `DATE`    |                         |

---

### 🏆 `Achievements`

| Column         | Data Type      | Notes                    |
| -------------- | -------------- | ------------------------ |
| ID             | `INTEGER`      | Primary Key              |
| title          | `VARCHAR(100)` |                          |
| description    | `TEXT`         |                          |
| XPBoostPercent | `DECIMAL(5,2)` | e.g., 10.00 = +10% boost |
| icon           | `VARCHAR(255)` | URL or path to icon      |

---

### 🧍‍♀️➡️🏆 `UserAchievements`

| Column           | Data Type | Notes                          |
| ---------------- | --------- | ------------------------------ |
| ID               | `INTEGER` | Primary Key                    |
| FID_Users        | `INTEGER` | Foreign Key → Users(ID)        |
| FID_Achievements | `INTEGER` | Foreign Key → Achievements(ID) |
| date_earned      | `DATE`    |                                |

---

### 📸 `TaskProofTypes`

| Column | Data Type     | Notes                        |
| ------ | ------------- | ---------------------------- |
| ID     | `INTEGER`     | Primary Key                  |
| type   | `VARCHAR(50)` | e.g., "photo", "GPS", "quiz" |

---

### 📎 `TaskRequirements`

| Column             | Data Type | Notes                                 |
| ------------------ | --------- | ------------------------------------- |
| ID                 | `INTEGER` | Primary Key                           |
| FID_Tasks          | `INTEGER` | Foreign Key → Tasks(ID)               |
| FID_TaskProofTypes | `INTEGER` | Foreign Key → TaskProofTypes(ID)      |
| optional           | `BOOLEAN` | Whether proof is required or optional |

---

### 📘 `Courses`

| Column      | Data Type      | Notes                          |
| ----------- | -------------- | ------------------------------ |
| ID          | `INTEGER`      | Primary Key                    |
| title       | `VARCHAR(100)` |                                |
| description | `TEXT`         |                                |
| icon        | `VARCHAR(255)` | Optional image/icon for course |

---

### 📘➡️✅ `CourseTasks`

| Column      | Data Type | Notes                     |
| ----------- | --------- | ------------------------- |
| ID          | `INTEGER` | Primary Key               |
| FID_Courses | `INTEGER` | Foreign Key → Courses(ID) |
| FID_Tasks   | `INTEGER` | Foreign Key → Tasks(ID)   |
| order       | `INTEGER` | Display/sequencing order  |

---

### 🎨 `UserCosmetics`

| Column      | Data Type | Notes                          |
| ----------- | --------- | ------------------------------ |
| ID          | `INTEGER` | Primary Key                    |
| FID_Users   | `INTEGER` | Foreign Key → Users(ID)        |
| FID_Rewards | `INTEGER` | Foreign Key → Rewards(ID)      |
| isEquipped  | `BOOLEAN` | Whether the cosmetic is active |
