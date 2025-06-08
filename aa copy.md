FAIL src/__test__/UserStats.test.js (27.722 s)
  ● UserStats Component › fetches and displays reaction counts

    TestingLibraryElementError: Unable to find an element with the text: Get Reactions. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 h-full overflow-y-auto"
        >
          <div
            class="w-full bg-white p-1 rounded-lg shadow-lg mb-6"
          >
            <div
              class="flex flex-col md:flex-row justify-around"
            >
              <button
                class="text-lg w-full font-semibold py-2 px-4 text-gray-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Statistics
              </button>
              <button
                class="text-lg w-full font-semibold py-2 px-4 rounded text-white bg-blue-600"
              >
                Reactions
              </button>
            </div>
          </div>
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden p-4 mb-6"
          >
            <div
              class="flex flex-wrap gap-4 items-center"
            >
              <div
                class="flex items-center gap-2"
              >
                <label
                  class="font-medium"
                  for="startDate"
                >
                  Start Date:
                </label>
                <input
                  class="border rounded px-3 py-2"
                  id="startDate"
                  max="2025-06-07"
                  placeholder="YYYY-MM-DD"
                  type="date"
                  value="2025-05-06"
                />
              </div>
              <div
                class="flex items-center gap-2"
              >
                <label
                  class="font-medium"
                  for="endDate"
                >
                  End Date:
                </label>
                <input
                  class="border rounded px-3 py-2"
                  id="endDate"
                  max="2025-06-07"
                  placeholder="YYYY-MM-DD"
                  type="date"
                  value="2025-06-06"
                />
              </div>
              <button
                class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled=""
              >
                Loading...
              </button>
              <button
                class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled=""
              >
                Export to CSV
              </button>
            </div>
          </div>
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden p-6"
          >
            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div
                class="p-6 rounded-lg shadow text-center bg-green-100"
              >
                <div
                  class="text-4xl font-bold mb-2 text-green-800"
                >
                  0
                </div>
                <div
                  class="text-lg font-medium text-green-800"
                >
                  Positive
                </div>
              </div>
              <div
                class="p-6 rounded-lg shadow text-center bg-red-100"
              >
                <div
                  class="text-4xl font-bold mb-2 text-red-800"
                >
                  0
                </div>
                <div
                  class="text-lg font-medium text-red-800"
                >
                  Negative
                </div>
              </div>
              <div
                class="p-6 rounded-lg shadow text-center bg-gray-100"
              >
                <div
                  class="text-4xl font-bold mb-2 text-gray-800"
                >
                  0
                </div>
                <div
                  class="text-lg font-medium text-gray-800"
                >
                  Other
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>

      216 |
      217 |     // Trigger reactions fetch
    > 218 |     fireEvent.click(screen.getByText('Get Reactions'));
          |                            ^
      219 |
      220 |     // Wait for reactions API call
      221 |     await waitFor(() => {

      at Object.getElementError (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/config.js:37:19)
      at allQuery (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/query-helpers.js:76:38)
      at query (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/query-helpers.js:52:17)
      at getByText (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/query-helpers.js:95:19)
      at Object.<anonymous> (src/__test__/UserStats.test.js:218:28)

  ● UserStats Component › exports reactions data to CSV

    TestingLibraryElementError: Unable to find an element with the text: Get Reactions. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 h-full overflow-y-auto"
        >
          <div
            class="w-full bg-white p-1 rounded-lg shadow-lg mb-6"
          >
            <div
              class="flex flex-col md:flex-row justify-around"
            >
              <button
                class="text-lg w-full font-semibold py-2 px-4 text-gray-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Statistics
              </button>
              <button
                class="text-lg w-full font-semibold py-2 px-4 rounded text-white bg-blue-600"
              >
                Reactions
              </button>
            </div>
          </div>
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden p-4 mb-6"
          >
            <div
              class="flex flex-wrap gap-4 items-center"
            >
              <div
                class="flex items-center gap-2"
              >
                <label
                  class="font-medium"
                  for="startDate"
                >
                  Start Date:
                </label>
                <input
                  class="border rounded px-3 py-2"
                  id="startDate"
                  max="2025-06-07"
                  placeholder="YYYY-MM-DD"
                  type="date"
                  value="2025-05-06"
                />
              </div>
              <div
                class="flex items-center gap-2"
              >
                <label
                  class="font-medium"
                  for="endDate"
                >
                  End Date:
                </label>
                <input
                  class="border rounded px-3 py-2"
                  id="endDate"
                  max="2025-06-07"
                  placeholder="YYYY-MM-DD"
                  type="date"
                  value="2025-06-06"
                />
              </div>
              <button
                class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled=""
              >
                Loading...
              </button>
              <button
                class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled=""
              >
                Export to CSV
              </button>
            </div>
          </div>
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden p-6"
          >
            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div
                class="p-6 rounded-lg shadow text-center bg-green-100"
              >
                <div
                  class="text-4xl font-bold mb-2 text-green-800"
                >
                  0
                </div>
                <div
                  class="text-lg font-medium text-green-800"
                >
                  Positive
                </div>
              </div>
              <div
                class="p-6 rounded-lg shadow text-center bg-red-100"
              >
                <div
                  class="text-4xl font-bold mb-2 text-red-800"
                >
                  0
                </div>
                <div
                  class="text-lg font-medium text-red-800"
                >
                  Negative
                </div>
              </div>
              <div
                class="p-6 rounded-lg shadow text-center bg-gray-100"
              >
                <div
                  class="text-4xl font-bold mb-2 text-gray-800"
                >
                  0
                </div>
                <div
                  class="text-lg font-medium text-gray-800"
                >
                  Other
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>

      255 |
      256 |     // Trigger reactions fetch
    > 257 |     fireEvent.click(screen.getByText('Get Reactions'));
          |                            ^
      258 |     await waitFor(() => expect(screen.getByText('9')).toBeInTheDocument());
      259 |
      260 |     // Trigger export

      at Object.getElementError (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/config.js:37:19)
      at allQuery (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/query-helpers.js:76:38)
      at query (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/query-helpers.js:52:17)
      at getByText (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/query-helpers.js:95:19)
      at Object.<anonymous> (src/__test__/UserStats.test.js:257:28)

  ● UserStats Component › disables buttons during statistics loading

    Unable to find an element with the text: Get Stats. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 h-full overflow-y-auto"
        >
          <div
            class="w-full bg-white p-1 rounded-lg shadow-lg mb-6"
          >
            <div
              class="flex flex-col md:flex-row justify-around"
            >
              <button
                class="text-lg w-full font-semibold py-2 px-4 rounded text-white bg-blue-600"
              >
                Statistics
              </button>
              <button
                class="text-lg w-full font-semibold py-2 px-4 text-gray-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reactions
              </button>
            </div>
          </div>
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden p-4 mb-6"
          >
            <div
              class="flex flex-wrap gap-4 items-center"
            >
              <div
                class="flex items-center gap-2"
              >
                <label
                  class="font-medium"
                  for="startDate"
                >
                  Start Date:
                </label>
                <input
                  class="border rounded px-3 py-2"
                  id="startDate"
                  max="2025-06-07"
                  placeholder="YYYY-MM-DD"
                  type="date"
                  value="2025-05-06"
                />
              </div>
              <div
                class="flex items-center gap-2"
              >
                <label
                  class="font-medium"
                  for="endDate"
                >
                  End Date:
                </label>
                <input
                  class="border rounded px-3 py-2"
                  id="endDate"
                  max="2025-06-07"
                  placeholder="YYYY-MM-DD"
                  type="date"
                  value="2025-06-06"
                />
              </div>
              <button
                class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled=""
              >
                Loading...
              </button>
            </div>
          </div>
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden p-6"
          >
            <div
              class="flex justify-center items-center py-12"
            >
              <div
                class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </body>

      293 |
      294 |     // Verify loading state
    > 295 |     await waitFor(() => {
          |                  ^
      296 |       expect(screen.getByText('Loading...')).toBeInTheDocument();
      297 |       expect(screen.getByText('Get Stats')).toBeDisabled();
      298 |     });

      at waitForWrapper (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/wait-for.js:166:27)
      at Object.<anonymous> (src/__test__/UserStats.test.js:295:18)

  ● UserStats Component › disables buttons during reactions loading

    TestingLibraryElementError: Unable to find an element with the text: Get Reactions. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 h-full overflow-y-auto"
        >
          <div
            class="w-full bg-white p-1 rounded-lg shadow-lg mb-6"
          >
            <div
              class="flex flex-col md:flex-row justify-around"
            >
              <button
                class="text-lg w-full font-semibold py-2 px-4 text-gray-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Statistics
              </button>
              <button
                class="text-lg w-full font-semibold py-2 px-4 rounded text-white bg-blue-600"
              >
                Reactions
              </button>
            </div>
          </div>
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden p-4 mb-6"
          >
            <div
              class="flex flex-wrap gap-4 items-center"
            >
              <div
                class="flex items-center gap-2"
              >
                <label
                  class="font-medium"
                  for="startDate"
                >
                  Start Date:
                </label>
                <input
                  class="border rounded px-3 py-2"
                  id="startDate"
                  max="2025-06-07"
                  placeholder="YYYY-MM-DD"
                  type="date"
                  value="2025-05-06"
                />
              </div>
              <div
                class="flex items-center gap-2"
              >
                <label
                  class="font-medium"
                  for="endDate"
                >
                  End Date:
                </label>
                <input
                  class="border rounded px-3 py-2"
                  id="endDate"
                  max="2025-06-07"
                  placeholder="YYYY-MM-DD"
                  type="date"
                  value="2025-06-06"
                />
              </div>
              <button
                class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled=""
              >
                Loading...
              </button>
              <button
                class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled=""
              >
                Export to CSV
              </button>
            </div>
          </div>
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden p-6"
          >
            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div
                class="p-6 rounded-lg shadow text-center bg-green-100"
              >
                <div
                  class="text-4xl font-bold mb-2 text-green-800"
                >
                  0
                </div>
                <div
                  class="text-lg font-medium text-green-800"
                >
                  Positive
                </div>
              </div>
              <div
                class="p-6 rounded-lg shadow text-center bg-red-100"
              >
                <div
                  class="text-4xl font-bold mb-2 text-red-800"
                >
                  0
                </div>
                <div
                  class="text-lg font-medium text-red-800"
                >
                  Negative
                </div>
              </div>
              <div
                class="p-6 rounded-lg shadow text-center bg-gray-100"
              >
                <div
                  class="text-4xl font-bold mb-2 text-gray-800"
                >
                  0
                </div>
                <div
                  class="text-lg font-medium text-gray-800"
                >
                  Other
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>

      323 |
      324 |     // Trigger manual fetch
    > 325 |     fireEvent.click(screen.getByText('Get Reactions'));
          |                            ^
      326 |
      327 |     // Verify loading state
      328 |     await waitFor(() => {

      at Object.getElementError (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/config.js:37:19)
      at allQuery (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/query-helpers.js:76:38)
      at query (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/query-helpers.js:52:17)
      at getByText (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/query-helpers.js:95:19)
      at Object.<anonymous> (src/__test__/UserStats.test.js:325:28)

  ● UserStats Component › handles reactions API errors

    TestingLibraryElementError: Unable to find an element with the text: Get Reactions. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 h-full overflow-y-auto"
        >
          <div
            class="w-full bg-white p-1 rounded-lg shadow-lg mb-6"
          >
            <div
              class="flex flex-col md:flex-row justify-around"
            >
              <button
                class="text-lg w-full font-semibold py-2 px-4 text-gray-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Statistics
              </button>
              <button
                class="text-lg w-full font-semibold py-2 px-4 rounded text-white bg-blue-600"
              >
                Reactions
              </button>
            </div>
          </div>
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden p-4 mb-6"
          >
            <div
              class="flex flex-wrap gap-4 items-center"
            >
              <div
                class="flex items-center gap-2"
              >
                <label
                  class="font-medium"
                  for="startDate"
                >
                  Start Date:
                </label>
                <input
                  class="border rounded px-3 py-2"
                  id="startDate"
                  max="2025-06-07"
                  placeholder="YYYY-MM-DD"
                  type="date"
                  value="2025-05-06"
                />
              </div>
              <div
                class="flex items-center gap-2"
              >
                <label
                  class="font-medium"
                  for="endDate"
                >
                  End Date:
                </label>
                <input
                  class="border rounded px-3 py-2"
                  id="endDate"
                  max="2025-06-07"
                  placeholder="YYYY-MM-DD"
                  type="date"
                  value="2025-06-06"
                />
              </div>
              <button
                class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled=""
              >
                Loading...
              </button>
              <button
                class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled=""
              >
                Export to CSV
              </button>
            </div>
          </div>
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden p-6"
          >
            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div
                class="p-6 rounded-lg shadow text-center bg-green-100"
              >
                <div
                  class="text-4xl font-bold mb-2 text-green-800"
                >
                  0
                </div>
                <div
                  class="text-lg font-medium text-green-800"
                >
                  Positive
                </div>
              </div>
              <div
                class="p-6 rounded-lg shadow text-center bg-red-100"
              >
                <div
                  class="text-4xl font-bold mb-2 text-red-800"
                >
                  0
                </div>
                <div
                  class="text-lg font-medium text-red-800"
                >
                  Negative
                </div>
              </div>
              <div
                class="p-6 rounded-lg shadow text-center bg-gray-100"
              >
                <div
                  class="text-4xl font-bold mb-2 text-gray-800"
                >
                  0
                </div>
                <div
                  class="text-lg font-medium text-gray-800"
                >
                  Other
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>

      363 |
      364 |     // Trigger reactions fetch
    > 365 |     fireEvent.click(screen.getByText('Get Reactions'));
          |                            ^
      366 |
      367 |     await waitFor(() => {
      368 |       expect(toast.error).toHaveBeenCalledWith('Failed to fetch reactions data');

      at Object.getElementError (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/config.js:37:19)
      at allQuery (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/query-helpers.js:76:38)
      at query (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/query-helpers.js:52:17)
      at getByText (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/query-helpers.js:95:19)
      at Object.<anonymous> (src/__test__/UserStats.test.js:365:28)

  ● UserStats Component › shows no data message for statistics

    Unable to find an element with the text: /No statistics data available/. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 h-full overflow-y-auto"
        >
          <div
            class="w-full bg-white p-1 rounded-lg shadow-lg mb-6"
          >
            <div
              class="flex flex-col md:flex-row justify-around"
            >
              <button
                class="text-lg w-full font-semibold py-2 px-4 rounded text-white bg-blue-600"
              >
                Statistics
              </button>
              <button
                class="text-lg w-full font-semibold py-2 px-4 text-gray-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reactions
              </button>
            </div>
          </div>
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden p-4 mb-6"
          >
            <div
              class="flex flex-wrap gap-4 items-center"
            >
              <div
                class="flex items-center gap-2"
              >
                <label
                  class="font-medium"
                  for="startDate"
                >
                  Start Date:
                </label>
                <input
                  class="border rounded px-3 py-2"
                  id="startDate"
                  max="2025-06-07"
                  placeholder="YYYY-MM-DD"
                  type="date"
                  value="2025-05-06"
                />
              </div>
              <div
                class="flex items-center gap-2"
              >
                <label
                  class="font-medium"
                  for="endDate"
                >
                  End Date:
                </label>
                <input
                  class="border rounded px-3 py-2"
                  id="endDate"
                  max="2025-06-07"
                  placeholder="YYYY-MM-DD"
                  type="date"
                  value="2025-06-06"
                />
              </div>
              <button
                class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Get Stats
              </button>
            </div>
          </div>
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden p-6"
          >
            <div
              class="space-y-4"
            >
              <div
                class="p-4 rounded-xl shadow-sm transition-shadow duration-200 bg-blue-700 text-white"
              >
                <div
                  class="flex justify-between items-center mb-1"
                >
                  <h3
                    class="text-lg font-semibold"
                  >
                    Active users
                  </h3>
                  <span
                    class="text-2xl font-bold"
                  >
                    0
                  </span>
                </div>
                <p
                  class="text-sm"
                >
                  Users who are in/had conversation with bot during the past 2 hours

                  <span
                    class="ml-2 text-xs bg-green-400 text-green-900 px-2 py-0.5 rounded-full"
                  >
                    LIVE
                  </span>
                </p>
              </div>
              <div
                class="p-4 rounded-xl shadow-sm transition-shadow duration-200 bg-white border border-gray-200"
              >
                <div
                  class="flex justify-between items-center mb-1"
                >
                  <h3
                    class="text-lg font-semibold"
                  >
                    Unique users
                  </h3>
                  <span
                    class="text-2xl font-bold"
                  >
                    0
                  </span>
                </div>
                <p
                  class="text-sm"
                >
                  Distinct users during the filtered period

                </p>
              </div>
              <div
                class="p-4 rounded-xl shadow-sm transition-shadow duration-200 bg-white border border-gray-200"
              >
                <div
                  class="flex justify-between items-center mb-1"
                >
                  <h3
                    class="text-lg font-semibold"
                  >
                    New users
                  </h3>
                  <span
                    class="text-2xl font-bold"
                  >
                    0
                  </span>
                </div>
                <p
                  class="text-sm"
                >
                  First time users during the filtered period

                </p>
              </div>
              <div
                class="p-4 rounded-xl shadow-sm transition-shadow duration-200 bg-white border border-gray-200"
              >
                <div
                  class="flex justify-between items-center mb-1"
                >
                  <h3
                    class="text-lg font-semibold"
                  >
                    Returning users
                  </h3>
                  <span
                    class="text-2xl font-bold"
                  >
                    0
                  </span>
                </div>
                <p
                  class="text-sm"
                >
                  Users who had conversation with bot before the filtered period as well

                </p>
              </div>
              <div
                class="p-4 rounded-xl shadow-sm transition-shadow duration-200 bg-white border border-gray-200"
              >
                <div
                  class="flex justify-between items-center mb-1"
                >
                  <h3
                    class="text-lg font-semibold"
                  >
                    Recurring users
                  </h3>
                  <span
                    class="text-2xl font-bold"
                  >
                    0
                  </span>
                </div>
                <p
                  class="text-sm"
                >
                  Users who had conversation with bot during the filtered period on multiple days

                </p>
              </div>
              <div
                class="p-4 rounded-xl shadow-sm transition-shadow duration-200 bg-white border border-gray-200"
              >
                <div
                  class="flex justify-between items-center mb-1"
                >
                  <h3
                    class="text-lg font-semibold"
                  >
                    One-shot users
                  </h3>
                  <span
                    class="text-2xl font-bold"
                  >
                    0
                  </span>
                </div>
                <p
                  class="text-sm"
                >
                  Users who had conversation with bot during the filtered period on only one day

                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>

      377 |     renderComponent();
      378 |
    > 379 |     expect(await screen.findByText(/No statistics data available/)).toBeInTheDocument();
          |                         ^
      380 |   });
      381 |
      382 |   // Test Case 13: Reactions No Data State

      at waitForWrapper (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/wait-for.js:166:27)
      at findByText (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/query-helpers.js:86:32)
      at Object.<anonymous> (src/__test__/UserStats.test.js:379:25)
      at TestScheduler.scheduleTests (node_modules/react-scripts/node_modules/@jest/core/build/TestScheduler.js:333:13)
      at runJest (node_modules/react-scripts/node_modules/@jest/core/build/runJest.js:404:19)
      at _run10000 (node_modules/react-scripts/node_modules/@jest/core/build/cli/index.js:320:7)
      at runCLI (node_modules/react-scripts/node_modules/@jest/core/build/cli/index.js:173:3)

  ● UserStats Component › shows no data message for reactions

    TestingLibraryElementError: Unable to find an element with the text: Get Reactions. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 h-full overflow-y-auto"
        >
          <div
            class="w-full bg-white p-1 rounded-lg shadow-lg mb-6"
          >
            <div
              class="flex flex-col md:flex-row justify-around"
            >
              <button
                class="text-lg w-full font-semibold py-2 px-4 text-gray-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Statistics
              </button>
              <button
                class="text-lg w-full font-semibold py-2 px-4 rounded text-white bg-blue-600"
              >
                Reactions
              </button>
            </div>
          </div>
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden p-4 mb-6"
          >
            <div
              class="flex flex-wrap gap-4 items-center"
            >
              <div
                class="flex items-center gap-2"
              >
                <label
                  class="font-medium"
                  for="startDate"
                >
                  Start Date:
                </label>
                <input
                  class="border rounded px-3 py-2"
                  id="startDate"
                  max="2025-06-07"
                  placeholder="YYYY-MM-DD"
                  type="date"
                  value="2025-05-06"
                />
              </div>
              <div
                class="flex items-center gap-2"
              >
                <label
                  class="font-medium"
                  for="endDate"
                >
                  End Date:
                </label>
                <input
                  class="border rounded px-3 py-2"
                  id="endDate"
                  max="2025-06-07"
                  placeholder="YYYY-MM-DD"
                  type="date"
                  value="2025-06-06"
                />
              </div>
              <button
                class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled=""
              >
                Loading...
              </button>
              <button
                class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled=""
              >
                Export to CSV
              </button>
            </div>
          </div>
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden p-6"
          >
            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div
                class="p-6 rounded-lg shadow text-center bg-green-100"
              >
                <div
                  class="text-4xl font-bold mb-2 text-green-800"
                >
                  0
                </div>
                <div
                  class="text-lg font-medium text-green-800"
                >
                  Positive
                </div>
              </div>
              <div
                class="p-6 rounded-lg shadow text-center bg-red-100"
              >
                <div
                  class="text-4xl font-bold mb-2 text-red-800"
                >
                  0
                </div>
                <div
                  class="text-lg font-medium text-red-800"
                >
                  Negative
                </div>
              </div>
              <div
                class="p-6 rounded-lg shadow text-center bg-gray-100"
              >
                <div
                  class="text-4xl font-bold mb-2 text-gray-800"
                >
                  0
                </div>
                <div
                  class="text-lg font-medium text-gray-800"
                >
                  Other
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>

      390 |
      391 |     // Trigger reactions fetch
    > 392 |     fireEvent.click(screen.getByText('Get Reactions'));
          |                            ^
      393 |
      394 |     expect(await screen.findByText(/No reactions data available/)).toBeInTheDocument();
      395 |   });

      at Object.getElementError (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/config.js:37:19)
      at allQuery (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/query-helpers.js:76:38)
      at query (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/query-helpers.js:52:17)
      at getByText (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/query-helpers.js:95:19)
      at Object.<anonymous> (src/__test__/UserStats.test.js:392:28)
