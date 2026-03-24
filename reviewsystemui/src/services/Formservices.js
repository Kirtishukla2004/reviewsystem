const API_Base_URL = "http://127.0.0.1:8000";

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_Base_URL}/categories/`);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export const getReviews = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_Base_URL}/reviews/getreviews/?page=${page}&limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }

    const json = await response.json();

    return {
      data: json.data.map((r) => ({
        id: r.id,
        category: r.categoryname,
        subcategory: r.subcategory,
        type: r.reviewtype,
        recommended: r.recommended ? "Yes" : "No",
        text: r.reviewtext,
        createdAt: r.created_at,
        ishidden: r.ishidden,
        sentimentreason: r.sentimentreason,
      })),
      total: json.total,
      hasMore: json.has_more,
      totalPages: json.total_pages,
    };
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const UpdateReview = async (reviewdata) => {
  try {
    const response = await fetch(`${API_Base_URL}/reviews/updatereview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewdata),
    });

    if (response.status === 429) {
      throw new Error("rate_limited");
    }

    if (!response.ok) throw new Error("Failed to submit review");
    return response.json();
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

export const DeleteReview = async (reviewId, reviewText, reason) => {
  try {
    const response = await fetch(`${API_Base_URL}/reviews/deletereview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: reviewId,
        reviewtext: reviewText,
        deletereason: reason,
      }),
    });
    if (!response.ok) throw new Error("Failed to report review");
    return response.json();
  } catch (error) {
    console.error("Error reporting review:", error);
    throw error;
  }
};
