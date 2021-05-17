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

module.exports = {
    selectAdminEmail,
    selectAdminPassword,
    selectAdminAccount
}