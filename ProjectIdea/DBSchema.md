# 🗄️ Database Schema

The application uses **MongoDB Atlas** as its database. The data is organized into multiple collections, each representing a specific entity in the system.

## Database Structure

```text
community_social_app
│
├── users
├── groups
├── groupMembers
├── posts
├── comments
├── reactions
├── notifications
└── joinRequests
```

---

## Collections

### 👤 users

Stores user account information.

```ts
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String,
  profileImage: String,
  bio: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

### 👥 groups

Stores information about each community or organization.

```ts
{
  _id: ObjectId,
  name: String,
  description: String,
  coverImage: String,
  logoImage: String,
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

---

### 👥 groupMembers

Manages the relationship between users and groups.

```ts
{
  _id: ObjectId,
  groupId: ObjectId,
  userId: ObjectId,
  role: "owner" | "admin" | "member",
  joinedAt: Date
}
```

> **Note:** A group can have multiple admins. The user who creates the group is assigned the **owner** role by default.

---

### 📝 posts

Stores posts shared inside groups.

```ts
{
  _id: ObjectId,
  groupId: ObjectId,
  authorId: ObjectId,
  content: String,
  images: [String],
  status: "pending" | "approved" | "rejected",
  approvedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

---

### 💬 comments

Stores comments on posts.

```ts
{
  _id: ObjectId,
  postId: ObjectId,
  authorId: ObjectId,
  content: String,
  createdAt: Date
}
```

---

### ❤️ reactions

Stores user reactions on posts.

```ts
{
  _id: ObjectId,
  postId: ObjectId,
  userId: ObjectId,
  type: "like" | "love" | "haha" | "wow" | "sad" | "angry",
  createdAt: Date
}
```

---

### 🔔 notifications

Stores notifications sent to users.

```ts
{
  _id: ObjectId,
  recipientId: ObjectId,
  senderId: ObjectId,
  type: String,
  message: String,
  isRead: Boolean,
  createdAt: Date
}
```

---

### 📨 joinRequests

Stores pending requests to join private groups.

```ts
{
  _id: ObjectId,
  groupId: ObjectId,
  userId: ObjectId,
  status: "pending" | "approved" | "rejected",
  createdAt: Date
}
```

---

# 🔗 Entity Relationships

```text
User
│
├── Creates
│      │
│      ▼
│    Group
│      │
│      ├── has many GroupMembers
│      └── has many Posts
│
├── Joins Groups
│
├── Creates Posts
│      │
│      ▼
│   Comments
│   Reactions
│
└── Receives Notifications
```

---

# 📊 Database Design

The database follows a **normalized design** to improve scalability and maintainability.

### Relationships

| Collection | Relationship |
|------------|--------------|
| users → groupMembers | One-to-Many |
| groups → groupMembers | One-to-Many |
| groups → posts | One-to-Many |
| users → posts | One-to-Many |
| posts → comments | One-to-Many |
| posts → reactions | One-to-Many |
| users → notifications | One-to-Many |

---

# 🚀 Why This Design?

- Supports **multiple admins** for each group.
- Prevents duplicate member data by separating memberships into the `groupMembers` collection.
- Makes permission management simple using role-based access (`owner`, `admin`, `member`).
- Scales efficiently for groups with thousands of members.
- Follows MongoDB best practices with normalized relationships and ObjectId references.