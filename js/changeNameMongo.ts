// // 배열 바꾸는 로직
// async array() {
//   const allValue = await this.cafeRepo.find();

//   for (let one of allValue) {
//     let content = await this.cafeRepo.findOne({ _id: one._id });
//     let images1 = content.images;

//     for (let i = 0; i < images1.length; i++) {
//       let url: string = images1[i].url;
//       const isDot = url.includes(".");

//       if (!isDot) {
//         content.images[i].url = `${content.images[i].url}.jpg`;
//       }
//       console.log(content.images[i].url);
//     }
//     const update = await this.cafeRepo.updateOne(
//       { _id: content._id },
//       {
//         images: content.images,
//       }
//     );
//   }
// }
