Công Cụ Kiểm Tra Các Nhóm Máu Tương Thích Trong Truyền Máu Ở Người
==================================================================

[English Version](../README.md)

Công cụ tương tác để tìm hiểu về sự tương thích giữa những nhóm máu cơ bản với nhau; chỉ nhằm cho mục đích giáo dục.

# Mục Lục
1. [Công Nghệ](#công-nghệ)
1. [Khởi Chạy Từ Mã Nguồn](#khởi-chạy-từ-mã-nguồn)
1. [Hướng Dẫn Sử Dụng](#hướng-dẫn-sử-dụng)
1. [Công Trạng](#công-trạng)

# Công Nghệ
Mặc dù việc sử dụng các framework phổ biến như React, Vue hoặc Svelt để xây dựng trang web này là hoàn toàn khả thi, hoặc thậm chí còn được khuyến khích, tôi đã quyết định ưu tiên sự đơn giản và dễ tiếp cận lên hàng đầu cho dự án này.

## Về phía client:
**HTML, CSS và JavaScript cơ bản:** Bộ ba huyền thoại này hình thành nên nền tảng cho giao diện người dùng và các tính năng tương tác của trang web, đảm bảo khả năng tương thích trên nhiều thiết bị và trình duyệt khác nhau. Với quy mô tương đối nhỏ của dự án, bộ công nghệ này đáp ứng yêu cầu giáo dục của dự án một cách hiệu quả.

## Về phía server:
Vì trang web này hoạt động gần giống như một trang web tĩnh (_static website_), nên ta không cần sử dụng phần mềm quá phức tạp cho bên máy chủ. Bởi thế, tôi đã quyết định thiết lập một máy chủ đơn giản sử dụng những công nghệ sau:

* **Node.js:** Môi trường runtime JavaScript phổ biến này xử lý hiệu quả các hoạt động phía máy chủ.

* **Express:** Framework tối giản này giúp cho việc xây dựng máy chủ Node.js có tổ chức hơn, đảm bảo về mặt hiệu năng và khả năng mở rộng tính năng của trang web.

* **Compression:** Thư viện này tối ưu hóa việc truyền tải dữ liệu, giảm thiểu thời gian tải (_load_) trang web và giúp người dùng có một trải nghiệm mượt mà hơn.

# Khởi Chạy Từ Mã Nguồn
Chạy Công Cụ Kiểm Tra Các Nhóm Máu Tương Thích Trong Truyền Máu Ở Người từ mã nguồn là một công đoạn tương đối khá đơn giản bởi vì không có bước biên dịch mã nguồn nào.

Để chạy trang web từ mã nguồn, trước tiên hãy đảm bảo rằng bạn đã tải xuống và cài đặt những thư viện (_dependencies_) sau trên máy tính của bạn:

* `node` >= `20.10.0`
* `compression` >= `1.7.4`
* `express` >= `4.18.2`
* `express-rate-limit` >= `7.1.5`

## Linux
Để bắt đầu trên Linux, trước tiên hãy cài đặt Node.js bằng trình quản lý gói (_package manager_) của bạn. Lưu ý rằng tên gói cụ thể có thể khác nhau trên từng distro Linux một.

**Fedora**
``` sh
dnf install nodejs
```

**Debian**
``` sh
apt install nodejs
```

**Arch:**
``` sh
pacman -S nodejs-lts-iron
```

Tiếp theo, sao chép kho lưu trữ mã nguồn (_repo_) trên GitHub vào hệ thống của bạn.
``` sh
git clone https://github.com/QingTian1927/Quynhbio-s-Interactive-Blood-Compatibility-Checker
```

Sau đó, sử dụng lệnh `cd` để di chuyển đến thư mục đã sao chép thành công và cài đặt các phần mềm phụ thuộc (_dependencies_) trên `npm`.
``` sh
npm install
```

Nếu `npm` thiết lập môi trường Node.js thành công, bạn chỉ cần khởi chạy máy chủ bằng lệnh sau:
``` sh
node server.js
```

Nếu mọi thứ diễn ra suôn sẻ, bạn sẽ thấy thông báo sau:
```
[INIT] [2024-02-16T04:32:12.318Z] Blood Compatibility listening on port {<PORT NUMBER>}
```

trong đó `<PORT NUMBER` có thể là bất kỳ số nào, chẳng hạn như `4242` hoặc `10000`.

Cuối cùng, mở trình duyệt web của bạn và nhập thông tin sau vào thanh địa chỉ.
```
localhost:<PORT NUMBER>
```

Nếu bạn nhập đúng `<PORT NUMBER>`, bạn sẽ thấy trang chủ của trang web xuất hiện.

## Windows (Chưa Hoàn Thiện)

# Hướng Dẫn Sử Dụng
## 1. Chọn nhóm máu người cho
Để trộn hai nhóm máu với nhau, ta trước hết phải chọn nhóm máu của người cho bằng cách ấn vào 1 trong 4 biểu tượng túi máu tượng trưng cho một nhóm máu của người cho.

Ví dụ như để chọn nhóm máu người cho là nhóm máu A, ta sẽ di chuyển con trỏ chuột ra chỗ biểu tượng túi máu nhóm A. Khi chưa chọn nhóm máu nào, hình con trỏ chuột, khi đưa vào gần một túi máu nào đó, sẽ hiện hình một ống tiêm trống không như sau:

![Hình 1.1: Con trỏ chuột khi chưa chọn nhóm máu nào](../public/assets/images/Manual/vi/Manual_SelectBloodBag_1.png)

Khi ấn vào biểu tượng một túi máu nào đó, con trỏ chuột sẽ hiện hình một ống tiêm nửa đầy như sau:

![Hình 1.2: Con trỏ chuột khi đã chọn một nhóm máu](../public/assets/images/Manual/vi/Manual_SelectBloodBag_2.png)

Khi đã chọn xong một nhóm máu, nhóm máu đang được chọn sẽ được hiển thị trong một biểu tượng hình tròn bên cạnh nút truy cập trang thông tin (**?**) ở đầu trang web như sau:

![Hình 1.3: Thông báo hiển thị nhóm máu đang được chọn](../public/assets/images/Manual/vi/Manual_BloodTypeNotification.png)

## 2. Trộn hai nhóm máu với nhau
Để trộn hai nhóm máu với nhau, ta chỉ cần ấn vào 1 trong 4 biểu tượng tượng trưng cho một nhóm máu của người nhận.

Giả dụ như ta muốn trộn nhóm máu A của người cho với nhóm máu O của người nhận, ta sẽ trước hết di chuyển con trỏ chuột tới biểu tượng nhóm máu O của người nhận. Khi đã chọn một nhóm máu người cho như ở trên bước 1, con trỏ chuột sẽ hiện hình một ống tiêm nửa đầy như sau:

![Hình 2.1: Nhóm máu O trước khi bị trộn với nhóm máu A](../public/assets/images/Manual/vi/Manual_MixBlood_1.png)

Khi ấn vào biểu tượng nhóm máu của người nhận, ta hiểu là ta đang trộn nhóm máu của người cho với nhóm máu của người nhận. Trong trường hợp này, bởi vì ta đang trộn nhóm máu A với nhóm máu O, nhóm máu O sẽ bị kết dính và sẽ hiển thị hình như sau:

![Hình 2.2: Nhóm máu O kết dính sau khi bị trộn với nhóm máu A](../public/assets/images/Manual/vi/Manual_MixBlood_2.png)

## 3. Khôi phục trạng thái ban đầu của công cụ
Khi nhóm máu người nhận kết dính sau khi trộn với nhóm máu của người cho, con trỏ chuột sẽ hiện hình một ống tiêm nửa đầy với hình tròn đỏ gạch chéo ở bên dưới (tham khảo _Hình 2.2_). Điều này có nghĩa là ta không thể trộn một nhóm máu đã bị kết dính với một nhóm máu nữa.

Ở trong ví dụ ở bước 2, để trộn nhóm máu O của người nhận với một nhóm máu khác của người cho, ta sẽ phải khôi phục trạng thái ban đầu của công cụ bằng cách ấn nút **Reset** ở cuối trang.

![Hình 3.1: Con trỏ chuột khi đặt trên nút reset](../public/assets/images/Manual/vi/Manual_ResetButton.png)

Khi ấn xong, công cụ sẽ được đưa lại về trạng thái ban đầu như khi mới mở trang web.

# Công Trạng
Ngoài việc sử dụng những thư viện bên thứ ba trong mã nguồn, trang web còn sử dụng một số tài nguyên từ các bên thứ ba cho phần thiết kế giao diện của trang web. Những tài nguyên đó sẽ được liệt kê trong danh sách sau đây:

* Biểu tượng ống tiêm con trỏ được chỉnh sửa từ file đồ họa **Green syringe element vector** của **rawpixel.com** trên trang [Freepik](https://www.freepik.com/free-vector/green-syringe-element-vector_18722102.htm#query=Green%20syringe%20element%20vector&position=10&from_view=search&track=ais&uuid=f56c1b4a-9ccd-4f33-9e3a-6b5c1ace3d64)

* Bảng màu của trang web tham khảo từ bảng màu **Palette** ở trang [GNOME Human Interface Guidelines](https://developer.gnome.org/hig/reference/palette.html)