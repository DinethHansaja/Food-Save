import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import "../../styles/Recipient/MyRequests.css";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all food requests from backend
  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/requests");

      // Backend returns the array directly
      setRequests(response.data || []);
    } catch (error) {
      console.error("Error fetching requests:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load your requests. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const getStatusClass = (status) => {
    return `request-status ${status}`;
  };

  return (
    <main className="my-requests-page">
      <section className="my-requests-container">

        {/* Header */}
        <div className="my-requests-header">
          <span>RECIPIENT</span>

          <h1>My Food Requests</h1>

          <p>
            Track the food you have requested and see the
            latest status of each request.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="requests-message">
            <p>Loading your requests...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="requests-message error">
            <p>{error}</p>

            <button onClick={fetchRequests}>
              Try Again
            </button>
          </div>
        )}

        {/* No Requests */}
        {!loading &&
          !error &&
          requests.length === 0 && (
            <div className="requests-message">

              <div className="empty-request-icon">
                📦
              </div>

              <h2>No requests yet</h2>

              <p>
                You haven't requested any surplus food yet.
              </p>

              <Link
                to="/food"
                className="browse-food-btn"
              >
                Browse Available Food
              </Link>

            </div>
          )}

        {/* Requests */}
        {!loading &&
          !error &&
          requests.length > 0 && (
            <div className="requests-list">

              {requests.map((request) => (
                <article
                  className="request-card"
                  key={request._id}
                >

                  {/* Request Header */}
                  <div className="request-card-header">

                    <div>
                      <span className="request-category">
                        FOOD REQUEST
                      </span>

                      <h2>
                        {request.foodName ||
                          "Food Listing"}
                      </h2>

                      <p>
                        From{" "}
                        <strong>
                          {request.businessName ||
                            "Business"}
                        </strong>
                      </p>
                    </div>

                    {/* Status */}
                    <span
                      className={getStatusClass(
                        request.status
                      )}
                    >
                      {request.status}
                    </span>

                  </div>

                  {/* Request Details */}
                  <div className="request-card-details">

                    <div>
                      <span>Food Name</span>

                      <strong>
                        {request.foodName || "N/A"}
                      </strong>
                    </div>

                    <div>
                      <span>Business</span>

                      <strong>
                        {request.businessName || "N/A"}
                      </strong>
                    </div>

                    <div>
                      <span>Recipient</span>

                      <strong>
                        {request.recipientName || "N/A"}
                      </strong>
                    </div>

                    <div>
                      <span>Quantity Requested</span>

                      <strong>
                        {request.quantityRequested}
                      </strong>
                    </div>

                    <div>
                      <span>Requested On</span>

                      <strong>
                        {request.requestedAt
                          ? new Date(
                              request.requestedAt
                            ).toLocaleString()
                          : "N/A"}
                      </strong>
                    </div>

                  </div>

                  {/* Status Message */}
                  <div className="request-card-footer">

                    {request.status === "pending" && (
                      <p>
                        ⏳ Waiting for the business to
                        review your request.
                      </p>
                    )}

                    {request.status === "accepted" && (
                      <p>
                        ✓ Your request was accepted.
                        Please collect the food from
                        the business.
                      </p>
                    )}

                    {request.status === "rejected" && (
                      <p>
                        This request was rejected by
                        the business.
                      </p>
                    )}

                    {request.status === "collected" && (
                      <p>
                        ✓ Food collected successfully.
                        Thank you for helping reduce
                        food waste!
                      </p>
                    )}

                  </div>

                </article>
              ))}

            </div>
          )}

      </section>
    </main>
  );
};

export default MyRequests;