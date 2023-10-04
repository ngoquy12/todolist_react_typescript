import { Button } from "antd";
import React, { useState } from "react";
import { Job } from "../entities/Job";

const Todo_List: React.FC<{}> = () => {
  const [jobs, setJobs] = useState(() => {
    // useState với callback func thì nó sẽ lấy giá trị được return bên trong
    // callback func đó làm giá trị khởi tạo
    const jobLocal = JSON.parse(localStorage.getItem("jobs") || "[]");
    return jobLocal;
  });

  return (
    <>
      {jobs.length > 0 ? (
        <>
          {/* render danh sách côg viẹc ra ngoài giao diện */}
          {jobs.map((job: Job) => (
            <div className="border shadow mb-2">
              <div className="flex justify-between items-center p-1">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="h-6" />
                  <span>{job.name}</span>
                </div>
                <Button danger>Xóa</Button>
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

export default Todo_List;
