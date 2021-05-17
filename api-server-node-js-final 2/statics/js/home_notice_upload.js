function submit_notice() {
  var formData = $(".form").serialize();
  $.ajax({
    url: "../notices",
    headers: {
      "x-access-token": 1, //jwt토큰으로 대체
    },
    type: "POST",
    cache: false,
    data: formData,
    dataType: "json",
  }).done(function (data) {
    console.log(data);
  });
}
