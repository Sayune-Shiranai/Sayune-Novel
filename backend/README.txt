cách sử dụng đường dẫn

vd
file server.js
app.use("/dashboard/category", dashboardCategoryRoutes) = /dashboard/category

file dashboardCategoryRoutes.js
router.get("/", getAllCategory);

=> đường dẫn /dashboard/category

nếu 
file dashboardCategoryRoutes.js
router.get("/update", getAllCategory);

=> đường dẫn /dashboard/category/update
