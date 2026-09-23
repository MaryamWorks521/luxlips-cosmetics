import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, Filter, MessageSquarePlus } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Review } from '../types';
import { useCart } from '../context/CartContext';

export const ReviewsSection: React.FC = () => {
  const { showToast } = useCart();

  // Aggregate all reviews across products
  const allReviews: Review[] = PRODUCTS.flatMap((p) => p.reviews || []);

  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');
  const [selectedSkinTone, setSelectedSkinTone] = useState<string>('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [helpfulCounts, setHelpfulCounts] = useState<{ [id: string]: number }>({});

  // New review form state
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    shade: 'Crimson Royale',
    skinTone: 'Medium',
    title: '',
    comment: ''
  });

  const [customReviews, setCustomReviews] = useState<Review[]>([]);

  const handleHelpful = (id: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    showToast('Thank you for your feedback!');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author.trim() || !newReview.comment.trim()) return;

    const created: Review = {
      id: `rev-custom-${Date.now()}`,
      author: newReview.author,
      rating: newReview.rating,
      date: 'Just now',
      shade: newReview.shade,
      verified: true,
      title: newReview.title || 'Exceptional luxury quality',
      comment: newReview.comment,
      skinTone: newReview.skinTone as any
    };

    setCustomReviews([created, ...customReviews]);
    setIsWriteModalOpen(false);
    showToast('Your verified review was published!');
    setNewReview({
      author: '',
      rating: 5,
      shade: 'Crimson Royale',
      skinTone: 'Medium',
      title: '',
      comment: ''
    });
  };

  const combinedReviews = [...customReviews, ...allReviews];

  const filteredReviews = combinedReviews.filter((rev) => {
    if (selectedRating !== 'all' && rev.rating !== selectedRating) return false;
    if (selectedSkinTone !== 'all' && rev.skinTone !== selectedSkinTone) return false;
    return true;
  });

  return (
    <section id="reviews-section" className="py-20 lg:py-28 bg-[#FAF7F5] dark:bg-[#12100E] border-t border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-rose-800 dark:text-amber-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900 px-3 py-1 rounded-full mb-3">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Real Customer Stories</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 dark:text-stone-50 leading-tight">
              Loved by Over 10,000 Smiles
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-2 max-w-xl">
              Authentic verified experiences from real beauty lovers around the globe.
            </p>
          </div>

          <button
            id="write-review-open-btn"
            onClick={() => setIsWriteModalOpen(true)}
            className="inline-flex items-center justify-center space-x-2 bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm transition-all self-start md:self-auto cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Rating Breakdown Bar & Stats Card */}
        <div className="bg-white dark:bg-[#181614] rounded-3xl p-6 sm:p-8 border border-stone-200/90 dark:border-stone-800 shadow-2xs mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Score */}
            <div className="md:col-span-4 text-center md:text-left md:border-r border-stone-200 dark:border-stone-800 md:pr-8">
              <div className="font-serif text-5xl sm:text-6xl font-bold text-stone-900 dark:text-stone-50">
                4.9
              </div>
              <div className="flex items-center justify-center md:justify-start text-amber-500 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Based on 3,400+ verified customer reviews
              </p>
              <div className="mt-3 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 inline-block px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                98% would recommend LuxeLips
              </div>
            </div>

            {/* Middle Rating Bars */}
            <div className="md:col-span-8 space-y-2 text-xs">
              {[
                { stars: 5, pct: 92, count: '3,128' },
                { stars: 4, pct: 7, count: '238' },
                { stars: 3, pct: 1, count: '34' },
                { stars: 2, pct: 0, count: '0' },
                { stars: 1, pct: 0, count: '0' }
              ].map((row) => (
                <div key={row.stars} className="flex items-center space-x-3">
                  <span className="w-12 text-stone-600 dark:text-stone-400 font-medium">
                    {row.stars} stars
                  </span>
                  <div className="flex-1 h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-stone-900 dark:bg-amber-400 rounded-full"
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  <span className="w-14 text-right text-stone-400">
                    {row.count}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center space-x-2 text-xs text-stone-600 dark:text-stone-400 font-semibold">
            <Filter className="w-3.5 h-3.5 text-stone-400" />
            <span>Filter by:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Skin tone filter */}
            <select
              value={selectedSkinTone}
              onChange={(e) => setSelectedSkinTone(e.target.value)}
              className="text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-full px-3 py-1.5 text-stone-800 dark:text-stone-200 focus:outline-none"
            >
              <option value="all">All Complexions</option>
              <option value="Fair">Fair</option>
              <option value="Light">Light</option>
              <option value="Medium">Medium</option>
              <option value="Tan">Tan</option>
              <option value="Deep">Deep</option>
            </select>

            {/* Star filter */}
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-full px-3 py-1.5 text-stone-800 dark:text-stone-200 focus:outline-none"
            >
              <option value="all">All Star Ratings</option>
              <option value="5">5 Stars only</option>
              <option value="4">4 Stars only</option>
            </select>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-[#181614] rounded-3xl p-6 border border-stone-200/90 dark:border-stone-800 shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-current' : 'text-stone-200 dark:text-stone-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>

                <h4 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 leading-snug">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center space-x-1.5 font-bold text-stone-900 dark:text-stone-200">
                    <span>{rev.author}</span>
                    {rev.verified && (
                      <span className="inline-flex items-center text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                        <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400 mr-0.5" />
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    Shade: <span className="text-stone-700 dark:text-amber-300 font-medium">{rev.shade}</span> • Complexion: {rev.skinTone}
                  </div>
                </div>

                <button
                  onClick={() => handleHelpful(rev.id)}
                  className="flex items-center space-x-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors p-1 cursor-pointer"
                  title="Mark review as helpful"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span className="text-[11px]">{helpfulCounts[rev.id] || 0}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181614] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-stone-200 dark:border-stone-800 shadow-2xl relative">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
            >
              ×
            </button>

            <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-50 mb-1">
              Share Your Experience
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-6">
              Help other beauty lovers find their signature shade and texture.
            </p>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maryam Mirza"
                  value={newReview.author}
                  onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                  className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Rating
                  </label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  >
                    <option value={5}>5 Stars (Love it!)</option>
                    <option value={4}>4 Stars (Very good)</option>
                    <option value={3}>3 Stars (Average)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Complexion Tone
                  </label>
                  <select
                    value={newReview.skinTone}
                    onChange={(e) => setNewReview({ ...newReview, skinTone: e.target.value })}
                    className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  >
                    <option value="Fair">Fair</option>
                    <option value="Light">Light</option>
                    <option value="Medium">Medium</option>
                    <option value="Tan">Tan</option>
                    <option value="Deep">Deep</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Shade Worn
                </label>
                <input
                  type="text"
                  placeholder="e.g. Crimson Royale or Spiced Almond"
                  value={newReview.shade}
                  onChange={(e) => setNewReview({ ...newReview, shade: e.target.value })}
                  className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  placeholder="Summarize your experience in one sentence"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Detailed Comments
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="How does the formula feel? How long does it last?"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="text-xs text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 px-4 py-2 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 text-xs font-semibold uppercase tracking-wider px-6 py-2.5 rounded-full cursor-pointer"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
