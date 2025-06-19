const API = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-8 md:px-20">
      <h2 className="text-4xl font-bold text-orange-600 mb-6 text-center">
        API Documentation
      </h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
        Integrate TrackVaults seamlessly into your application with our easy-to-use API. Access real-time document tracking, updates, and much more.
      </p>

      <div className="space-y-12">
        <section>
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">Getting Started</h3>
          <p className="text-gray-700 mb-4">
            To get started with the TrackVaults API, you first need to obtain an API key. You can get your API key from the TrackVaults dashboard under the API settings section.
          </p>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 mb-4">
            <code>
              {/* Example API key */}
              {"api_key = 'YOUR_API_KEY'"}
            </code>
          </pre>
          <p className="text-gray-700">
            Once you have your API key, you can start making API requests to TrackVaults to track your documents in real-time.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">API Endpoints</h3>
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-semibold text-orange-500">GET /api/documents</h4>
              <p className="text-gray-700 mb-2">
                This endpoint retrieves a list of all documents in the system. You can filter the results by date, status, and more.
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800">
                <code>
                  {`
                    fetch('https://api.trackvaults.com/api/documents', {
                      method: 'GET',
                      headers: {
                        'Authorization': 'Bearer YOUR_API_KEY'
                      }
                    })
                    .then(response => response.json())
                    .then(data => console.log(data));
                  `}
                </code>
              </pre>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-orange-500">POST /api/documents</h4>
              <p className="text-gray-700 mb-2">
                This endpoint allows you to upload a new document. Provide the document metadata and content in the body of the request.
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800">
                <code>
                  {`
                    fetch('https://api.trackvaults.com/api/documents', {
                      method: 'POST',
                      headers: {
                        'Authorization': 'Bearer YOUR_API_KEY',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        title: 'Document Title',
                        description: 'Document description...',
                        file: 'base64_encoded_file_content'
                      })
                    })
                    .then(response => response.json())
                    .then(data => console.log(data));
                  `}
                </code>
              </pre>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-orange-500">GET /api/document/{'{id}'}</h4>
              <p className="text-gray-700 mb-2">
                Use this endpoint to get details of a specific document by its unique ID.
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800">
                <code>
                  {`
                    fetch('https://api.trackvaults.com/api/document/{id}', {
                      method: 'GET',
                      headers: {
                        'Authorization': 'Bearer YOUR_API_KEY'
                      }
                    })
                    .then(response => response.json())
                    .then(data => console.log(data));
                  `}
                </code>
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">Error Handling</h3>
          <p className="text-gray-700 mb-4">
            The API will respond with appropriate HTTP status codes to indicate the success or failure of a request. For instance:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><span className="font-semibold text-gray-700">200 OK:</span> Request was successful.</li>
            <li><span className="font-semibold text-gray-700">400 Bad Request:</span> Invalid or missing parameters.</li>
            <li><span className="font-semibold text-gray-700">401 Unauthorized:</span> Missing or invalid API key.</li>
            <li><span className="font-semibold text-gray-700">500 Internal Server Error:</span> Something went wrong on our end.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">Support</h3>
          <p className="text-gray-700 mb-4">
            If you run into any issues while integrating with the API, please contact our support team at <span className="text-orange-500">support@trackvaults.com</span> or visit our <a href="/help" className="text-orange-500 hover:text-orange-600">Help Center</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default API;
