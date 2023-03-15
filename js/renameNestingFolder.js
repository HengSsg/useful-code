const fs = require("fs");

// fs.readdir(s3, (err, files) => {
//   files.forEach((file) => {
//     fs.rename(`${file}`, `${s3}/${file}.jpg`, function (err) {
//       if (err) throw err;
//       console.log("사진 이름 변경 완료");
//     });
//   });
// });

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
      const path1 = `${s3}/${file}`;
      const isDir = fs.lstatSync(path1).isDirectory();

      if (isDir) {
        fs.readdir(path1, (err, files) => {
          files.forEach((file1) => {
            const path2 = `${path1}/${file1}`;
            const isDot = file1.includes(".");
            const isDir2 = fs.lstatSync(path2).isDirectory();

            if (isDir2) {
              {
                fs.readdir(path2, (err, files) => {
                  files.forEach((file2) => {
                    const path3 = `${path2}/${file2}`;
                    const isDot = file2.includes(".");

                    if (!isDot) {
                      console.log(path3);
                      fs.renameSync(path3, `${path3}.jpg`);
                      console.log("변경1");
                    }
                  });
                });
              }
            } else {
              if (!isDot) {
                fs.renameSync(path2, `${path2}.jpg`);
                console.log("변경2");
              }
            }
          });
        });
      } else {
        const isDot = file.includes(".");

        if (!isDot) {
          fs.renameSync(path1, `${path1}.jpg`);
          console.log("변경3");
        }
      }
    });
  });
}

// fs.readdir(s3, (err, files) => {
//   files.forEach((file) => {
//     const path1 = `${s3}/${file}`;
//     const isDir = fs.lstatSync(path1).isDirectory();

//     if (isDir) {
//       fs.readdir(path1, (err, files) => {
//         files.forEach((file1) => {
//           const path2 = `${path1}/${file1}`;
//           const isDot = file1.includes(".");
//           const isDir2 = fs.lstatSync(path2).isDirectory();

//           if (isDir2) {
//             {
//               fs.readdir(path2, (err, files) => {
//                 files.forEach((file2) => {
//                   const path3 = `${path2}/${file2}`;
//                   const isDot = file1.includes(".");

//                   if (!isDot) {
//                     console.log(path3);
//                     fs.renameSync(path3, `${path3}.jpg`);
//                     console.log("변경1");
//                   }
//                 });
//               });
//             }
//           } else {
//             if (!isDot) {
//               fs.renameSync(path2, `${path2}.jpg`);
//               console.log("변경2");
//             }
//           }
//         });
//       });
//     } else {
//       const isDot = file.includes(".");

//       if (!isDot) {
//         fs.renameSync(path1, `${path1}.jpg`);
//         console.log("변경3");
//       }
//     }
//   });
// });
