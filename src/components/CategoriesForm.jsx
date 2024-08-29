import { useEffect, useState } from "react";

export default function CategoriesForm({handleSubmit, categories, nameProp}) {
    const [name, setName ] = useState("") 

useEffect(() => {
    if (categories){
        setName(categories.name)
    }
},[categories])

return (
    <>
      <form
        action=""
        onSubmit={(e) =>
          handleSubmit(e, name)
        }
      >
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <h2 className="font-semibold text-xl text-gray-600">
                {nameProp} Categories Form
              </h2>
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p>Please fill out all the fields.</p>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label htmlFor="full_name">Categories name</label>
                        <input
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          value={name}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                        <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button
                            type="submit"
                            className="btn  bg-blue-500 hover:bg-blue-700 text-white font-bol py-2 px-4 rounded"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
    
}

