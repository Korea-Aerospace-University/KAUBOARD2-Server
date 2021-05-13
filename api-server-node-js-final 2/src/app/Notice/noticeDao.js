// 공지 등록
async function insertNotice(connection, insertNoticeParams) {
  const insertNoticeQuery = `
                INSERT INTO Notice(adminIdx, title, contents) VALUES(?,?,?)
                `;
  const [noticeRows] = await connection.query(
    insertNoticeQuery,
    insertNoticeParams
  );
  return noticeRows;
}

module.exports = {
  insertNotice,
};
