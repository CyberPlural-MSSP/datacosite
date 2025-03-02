export default function AddData() {
  return (
    <div className="container w-full mx-auto my-auto">
      <div className="items-center justify-center text-center">
        <h1>Add Data</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
          </div>
        </div>
      </div>
    </div>
  )
}