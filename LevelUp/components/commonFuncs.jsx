function generateUniqueId(prefix = "") {
  const timestamp = Date.now().toString(36); // base36 = compact time
  const random = Math.random().toString(36).substring(2, 10); // 8 random chars
  return `${prefix}${timestamp}_${random}`;
}

export default generateUniqueId;
