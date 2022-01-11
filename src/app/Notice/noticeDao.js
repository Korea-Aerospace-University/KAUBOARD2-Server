// 공지 등록
async function insertNotice(connection, insertNoticeParams) {
    const insertNoticeQuery = `
                INSERT INTO Notice(adminIdx, title, contents, updatedAt) VALUES(?,?,?, now())
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
                `;
    const [noticeRows] = await connection.query(selectNoticesQuery);

    return noticeRows;
}

//관리자용 전체공지 조회
async function selectAllNotices(connection) {
    const selectNoticesQuery = `
                select Notice.idx, title,
                    contents,
                    adminName,
                    DATE_FORMAT(Notice.updatedAt, '%Y년 %m월 %d일') as createdAt
                from Notice
                join Admin on Admin.idx = Notice.adminIdx
                `;
    const [noticeRows] = await connection.query(selectNoticesQuery);
    return noticeRows;
}

//공지 1개 조회
async function selectNoticeById(connection, noticeIdx) {
    const selectNoticesQuery = `
                select Notice.idx, title,
                    contents,
                    adminName,
                    DATE_FORMAT(Notice.updatedAt, '%Y년 %m월 %d일') as createdAt
                from Notice
                join Admin on Admin.idx = Notice.adminIdx
                where Notice.idx=?
                `;
    const [noticeRows] = await connection.query(selectNoticesQuery, noticeIdx);

    return noticeRows;
}

// 공지 수정
async function updateNotice(connection, updateNoticeParams) {
    console.log(updateNoticeParams)
    const updateNoticeQuery = `
                UPDATE Notice set title=?, contents=? where idx=?
                `;
    const [noticeRows] = await connection.query(
        updateNoticeQuery,
        updateNoticeParams
    );
    return noticeRows;
}

// 공지 삭제
async function deleteNotice(connection, noticeIdx) {
    const deleteNoticeQuery = `
                DELETE From Notice where idx=?
                `;
    const [noticeRows] = await connection.query(
        deleteNoticeQuery,
        noticeIdx
    );
    return noticeRows;
}
module.exports = {
    insertNotice,
    selectNotices,
    selectAllNotices,
    selectNoticeById,
    updateNotice,
    deleteNotice
};
