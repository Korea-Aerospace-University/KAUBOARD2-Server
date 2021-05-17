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

// 공지 조회
async function selectNotices(connection) {
    const selectNoticesQuery = `
                select title,
                    contents,
                    adminName,
                    DATE_FORMAT(Notice.updatedAt, '%Y년 %m월 %d일') as createdAt
                from Notice
                join Admin on Admin.idx = Notice.adminIdx
                order by pinned = 'N';
                `;
    const [noticeRows] = await connection.query(selectNoticesQuery);

    return noticeRows;
}

module.exports = {
    insertNotice,
    selectNotices
};
