module.exports = function (app,conn) {
  /* 监听端口 */
  app.listen(3000, () => {
    console.log("——————————服务已启动——————————");
  });
  app.get("/", (req, res) => {
    res.send('<p style="color:red">服务已启动</p>');
  });
  //查
  app.get("/api/getUserList", (req, res) => {
    const sqlStr = "SELECT * FROM users";
    conn.query(sqlStr, (error, results) => {
      if (error)
        return res.json({
          code: 404,
          message: error,
        });
      res.json({
        code: 200,
        message: results,
        affextedRows: results.affextedRows,
      });
    });
  });
  //条件查找
  app.get("/api/getUserListById/:id", (req, res) => {
    const id = req.params.id;
    const sqlStr = "select * from users where id=?";
    conn.query(sqlStr, id, (err, results) => {
      if (err)
        return res.json({
          code: 404,
          message: "数据不存在",
          affextedRows: 0,
        });
      res.json({
        code: 200,
        message: results,
        affextedRows: results.affextedRows,
      });
    });
  });
  //添加
  app.post("/api/addUser", (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const sex = req.body.sex;
    const address = req.body.address;
    console.log("username:" + username);
    // const sqlStr = "insert into users(username,sex,address) values('" + username + "','" + sex + "','" + address + "')";
    const sqlStr = "insert into users set ?";
    console.log(sqlStr);
    conn.query(sqlStr, req.body, (err, results) => {
      if (err)
        return res.json({
          code: 404,
          message: err,
          affectedRows: 0,
        });
      res.json({
        code: 200,
        message: "添加成功",
        affectedRows: results.affectedRows,
      });
    });
  });
  //修改
  app.post("/api/updateUser", function (req, res) {
    console.log(req.body);
    const id = req.body.id;
    const username = req.body.username;
    const sex = req.body.sex;
    const address = req.body.address;
    const sqlStr =
      "update users set username='" +
      username +
      "',sex='" +
      sex +
      "',address='" +
      address +
      "'where id=" +
      id;
    console.log(sqlStr);
    conn.query(sqlStr, (err, results) => {
      if (err)
        return res.json({
          code: 404,
          message: err,
          affectedRows: 0,
        });
      res.json({
        code: 200,
        message: "修改成功",
        affectedRows: results.affectedRows,
      });
    });
  });
  //删除
  app.delete("/api/deleteUser/:id", function (req, res) {
    console.log("params:" + req.params);
    let id = req.params.id;
    let sql = "delete from users where id=" + id;
    conn.query(sql, id, (err, results) => {
      if (err)
        return res.json({
          code: 404,
          message: err,
          affectedRows: 0,
        });
      res.json({
        code: 200,
        message: "删除成功",
        affectedRows: results.affectedRows,
      });
    });
  });
};
