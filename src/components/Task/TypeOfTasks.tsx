// import { Box } from '@mui/material';
// import React from 'react'

// export default function TypeOfTasks() {
//   return (
//        <Box
//          sx={{ mb: 3 }}
//          onClick={() => {
//            openDeleteDialog ? false : true;
//          }}
//        >
//          <Paper
//            elevation={1}
//            sx={{
//              p: 2,
//              mb: 2,
//              borderRadius: "12px",
//              backgroundColor: "white",
//              transition: "all 0.3s ease",
//              "&:hover": {
//                transform: "translateY(-2px)",
//                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
//              },
//            }}
//          >
//            <Box
//              sx={{
//                display: "flex",
//                alignItems: "center",
//                justifyContent: "space-between",
//              }}
//            >
//              <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
//                <Typography
//                  variant="body1"
//                  sx={{
//                    color: "#374151",
//                    fontWeight: 500,
//                    flex: 1,
//                    textDecoration: isDone ? "line-through" : "none",
//                    opacity: isDone ? 0.6 : 1,
//                  }}
//                >
//                  {task}
//                </Typography>
//              </Box>
   
//              <Box>
//                <IconButton onClick={doneTask}>
//                  <CheckCircleIcon
//                    sx={{
//                      color: isDone ? "#10b981" : "gray",
//                      mr: 2,
//                      fontSize: "24px",
//                      cursor: "pointer",
//                      "&:hover": {
//                        transform: "scale(1.1)",
//                      },
//                    }}
//                  />
//                </IconButton>
//                <IconButton
//                  onClick={handleClickOpenEditDialog}
//                  size="small"
//                  sx={{
//                    color: "#6b7280",
//                    "&:hover": {
//                      backgroundColor: "#f3f4f6",
//                      color: "#6366f1",
//                    },
//                  }}
//                >
//                  <EditIcon />
//                </IconButton>
//                <IconButton
//                  size="small"
//                  onClick={handleClickOpenDeleteDialog}
//                  sx={{
//                    color: "#6b7280",
//                    "&:hover": {
//                      backgroundColor: "#fee2e2",
//                      color: "#ef4444",
//                    },
//                  }}
//                >
//                  <DeleteOutlineIcon />
//                </IconButton>
//              </Box>
//            </Box>
//          </Paper>
//          {/* ===========================Delete dialog==============  */}
//          <Dialog
//            open={openDeleteDialog}
//            onClose={handleCloseDeleteDialog}
//            aria-labelledby="alert-dialog-title"
//            aria-describedby="alert-dialog-description"
//          >
//            <DialogTitle id="alert-dialog-title">{"حذف مهمة ؟"}</DialogTitle>
//            <DialogContent>
//              <DialogContentText id="alert-dialog-description">
//                هل انت متاكد انك تريد حذف المهمة , لن تستطيع ارجاعها بعد الحذف
//              </DialogContentText>
//            </DialogContent>
//            <DialogActions>
//              <Button
//                onClick={() => {
//                  deleteTask();
//                  handleCloseDeleteDialog();
//                }}
//              >
//                احذف
//              </Button>
//              <Button onClick={handleCloseDeleteDialog} autoFocus>
//                اغلاق
//              </Button>
//            </DialogActions>
//          </Dialog>
//          {/* ||===========Delete Dialog==========|| */}
   
//          {/* Edit Dialgo */}
//          <Dialog open={openEditDialog} onClose={handleClickCloseEditDialog}>
//            <DialogTitle>تعديل مهمة : </DialogTitle>
//            <DialogContent sx={{ paddingBottom: 0 }}>
//              <DialogContentText>عدل مهمتك</DialogContentText>
//              <TextField
//                autoFocus
//                required
//                value={editTask}
//                onChange={(e) => {
//                  setEditTask(e.target.value);
//                }}
//                margin="dense"
//                id="ta"
//                name="ta"
//                label="تعديل مهمة"
//                type="text"
//                fullWidth
//                variant="standard"
//              />
//              <DialogActions>
//                <Button
//                  onClick={() => {
//                    handleEditTask();
//                    handleClickCloseEditDialog();
//                  }}
//                >
//                  تعديل
//                </Button>
//                <Button onClick={handleClickCloseEditDialog}>الغاء</Button>
//              </DialogActions>
//            </DialogContent>
//          </Dialog>
//          {/* Edit Dialgo */}
//        </Box>
//      );
//    }
   
//   )
// }
