// admin 이메일 조회
async function selectAdminEmail(connection, adminEmail) {
    const selectAdminEmailQuery = `
                SELECT adminEmail, adminName
                FROM Admin
                WHERE adminEmail = ?;
                `;
    const [emailRows] = await connection.query(selectAdminEmailQuery, adminEmail);

    return emailRows
};

// admin 비밀번호 조회
async function selectAdminPassword(connection, checkPasswordParams) {
    const selectAdminPasswordQuery = `
                SELECT adminEmail, adminName, password
                FROM Admin
                WHERE adminEmail = ? AND password = ?;
                `;
    const passwordRow = await connection.query(selectAdminPasswordQuery, checkPasswordParams);

    return passwordRow;
};

// admin status 조회
async function selectAdminAccount(connection, adminEmail) {
    const selectAdminAccountQuery = `
                SELECT idx, status, adminEmail
                FROM Admin
                WHERE adminEmail = ?;
                `;
    const adminAccountRow = await connection.query(selectAdminAccountQuery, adminEmail);

    return adminAccountRow[0];
};

// admin 추가
async function insertAdmin(connection, insertAdminParams) {
    const insertAdminQuery = `
                INSERT INTO Admin(adminName, adminEmail, password)
                VALUES (?, ?, ?);
                `;
    const insertAdminRow = await connection.query(insertAdminQuery, insertAdminParams);

    return insertAdminRow;
}

// admin status 변경
async function updateAdminStatus(connection, authEmail) {
    const updateAdminStatusQuery = `
                UPDATE Admin
                Set status = 1
                WHERE adminEmail = ?;
                `;
    const [updateRow] = await connection.query(updateAdminStatusQuery, authEmail);

    return updateRow;
}

module.exports = {
    selectAdminEmail,
    selectAdminPassword,
    selectAdminAccount,
    insertAdmin,
    updateAdminStatus
}