import { Alert, Button, Input } from "antd";
import React, { useRef, useState } from "react";
import { Job } from "../entities/Job";

const Todo_Form: React.FC = () => {
  const [showError, setShowError] = useState(false);
  const [job, setJob] = useState<any>("");
  const inputRef: any = useRef(); // Tạo tham chiếu đến phần tử trong DOM
  const [jobs, setJobs] = useState(() => {
    // useState với callback func thì nó sẽ lấy giá trị được return bên trong
    // callback func đó làm giá trị khởi tạo
    const jobLocal = JSON.parse(localStorage.getItem("jobs") || "[]");
    return jobLocal;
  });

  // Validate dữ liệu
  const validateData = (name: string, value: string) => {
    if (name === "job") {
      if (!value) {
        setShowError(true);
      } else {
        setShowError(false);
      }
    }
  };

  // Hàm lưu và cập nhật lại state
  const saveAndUpdateState = (newListJob: Job[]) => {
    // Cập nhật lại state (mảng công việc)
    setJobs(newListJob);

    // Gửi dữ liệu lên local
    localStorage.setItem("jobs", JSON.stringify(newListJob));
  };

  // lấy giá trị từ ô input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    // Gọi hàm validate
    validateData(name, value);
    // Cập nhật lại state của job
    setJob({
      ...job,
      [name]: value,
    });
  };

  // Hàm submit
  const handleSubmit = (e: React.FormEvent) => {
    // Ngăn chặn sự kiện mặc định
    e.preventDefault();
    // Đối tượng newJob
    const newJob: Job = {
      id: Math.ceil(Math.random() * 1000),
      name: job.job,
      status: false,
    };

    if (!job.job) {
      setShowError(true);
    } else {
      // Cập nhật lại state (mảng công việc)
      setJobs([...jobs, newJob]);

      // Gửi dữ liệu lên local
      localStorage.setItem("jobs", JSON.stringify([...jobs, newJob]));

      // Clean giá trị trong input
      setJob("");

      // Focus vào ô input sau khi submit
      inputRef.current.focus();
    }
  };

  // Hàm xóa công việc theo id
  const handleDelete = (id: number) => {
    // Lọc ra những phần tử có id khác với id cần xóa
    const newListJob = jobs.filter((job: Job) => job.id !== id);
    console.log(newListJob);

    // Cập nhật lại state (mảng công việc)
    saveAndUpdateState(newListJob);
  };

  // Cập nhật trạng thái công việc
  const handleUpdateJob = (id: number) => {
    // Lặp qua từng phàn tử của mảng và cập nhật id công việc
    const updateJobLocal = jobs.map((job: Job) => {
      if (job.id === id) {
        job.status = !job.status;
      }
      return job;
    });

    // Cập nhật lại state (mảng công việc)
    saveAndUpdateState(updateJobLocal);
  };

  return (
    <>
      <div>
        <h3 className="text-2xl font-bold text-center">Danh sách công việc</h3>
        <form className="flex gap-1 mb-2" onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            value={job.job}
            name="job"
            onChange={handleChange}
            placeholder="Nhập công việc..."
          />
          <Button type="primary" htmlType="submit" className="bg-blue-600">
            Thêm
          </Button>
        </form>
        {showError ? (
          <Alert
            className="mb-2"
            message="Tên công việc không được để trống."
            type="error"
            showIcon
          />
        ) : (
          <></>
        )}
      </div>
      {jobs.length > 0 ? (
        <>
          {/* render danh sách côg viẹc ra ngoài giao diện */}
          {jobs.map((job: Job) => (
            <div className="border shadow mb-2" key={job.id}>
              <div className="flex justify-between items-center p-1">
                <div className="flex items-center gap-2">
                  <input
                    checked={job.status}
                    onChange={() => handleUpdateJob(job.id)}
                    type="checkbox"
                    className="h-6"
                  />
                  {job.status ? <s>{job.name}</s> : <span>{job.name}</span>}
                </div>
                <Button
                  htmlType="button"
                  onClick={() => handleDelete(job.id)}
                  danger
                >
                  Xóa
                </Button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="border shadow mb-2">
            <div className="flex justify-center items-center p-3">
              <h3 className="text-center">Chưa có công việc</h3>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Todo_Form;
