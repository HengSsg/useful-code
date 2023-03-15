const webp = require("webp-converter");

// this will grant 755 permission to webp executables
webp.grant_permission();

const fs = require("fs");

// // 그냥 파일안엔 폴더일때 -----------
// fs.readdir(s3, (err, files) => {
//   files.forEach((file) => {
//     const result = webp.cwebp(
//       `${s3}/${file}`,
//       `${s3}/${file}`,
//       "-q 80",
//       (logging = "-v")
//     );
//     result.then((response) => {
//       console.log(response);
//     });
//   });
// });
// // ----------------------

// 2중 파일 nesting ----------
// 1

const nameList = [
  "/Users/hengsgg/s3/Contents",
  "/Users/hengsgg/s3/banner",
  "/Users/hengsgg/s3/common",
  "/Users/hengsgg/s3/newcafe",
  "/Users/hengsgg/s3/popup",
  "/Users/hengsgg/s3/question",
  "/Users/hengsgg/s3/reviews",
  "/Users/hengsgg/s3/shuTok",
  "/Users/hengsgg/s3/users",
];
for (let i = 0; i < nameList.length; i++) {
  const s3 = nameList[i];

  fs.readdir(s3, (err, files) => {
    files.forEach((file) => {
      if (fs.lstatSync(`${s3}/${file}`).isDirectory()) {
        // 2
        fs.readdir(`${s3}/${file}`, (err, files) => {
          files.forEach((file1) => {
            if (fs.lstatSync(`${s3}/${file}/${file1}`).isDirectory()) {
              // 3
              fs.readdir(`${s3}/${file}/${file1}`, (err, files) => {
                files.forEach((file2) => {
                  const result = webp.cwebp(
                    `${s3}/${file}/${file1}/${file2}`,
                    `${s3}/${file}/${file1}/${file2}`,
                    "-q 80",
                    (logging = "-v")
                  );
                  result.then((response) => {
                    console.log(response);
                  });
                });
              });
            } else {
              const result = webp.cwebp(
                `${s3}/${file}/${file1}`,
                `${s3}/${file}/${file1}`,
                "-q 80",
                (logging = "-v")
              );
              result.then((response) => {
                console.log(response);
              });
            }
          });
        });
      } else {
        const result = webp.cwebp(
          `${s3}/${file}`,
          `${s3}/${file}`,
          "-q 80",
          (logging = "-v")
        );
        result.then((response) => {
          console.log(response);
        });
      }
    });
  });
}

// ----------------------

// local to s3: aws s3 cp . s3://shuiiing-app-v2/ --recursive --acl public-read
