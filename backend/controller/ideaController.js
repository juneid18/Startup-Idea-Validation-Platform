import Idea from "../models/ideaSchema.js";
import User from "../models/userSchema.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini (will only work if GEMINI_API_KEY is in .env)
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

export const createAndAnalyzeIdea = async (req, res) => {
  try {
    const { title, description, category, targetAudience } = req.body;

    if (!title || !description || !category || !targetAudience) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    let validationScore = Math.floor(Math.random() * 40) + 50; // default random baseline
    let analysisResult = {
      pros: ["Clearly defined audience", "Strong potential for monetization", "Fits within a growing niche"],
      cons: ["High initial customer acquisition cost", "Significant execution risk", "Requires strong technical co-founder"],
      feedback: "This is a solid idea, but you need to narrow down your go-to-market strategy. Try to validate with 10 users first."
    };

    // Attempt actual AI validation if API key exists
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `You are a strict startup investor and analyst. I will provide you with a startup idea.
        Title: ${title}
        Category: ${category}
        Target Audience: ${targetAudience}
        Description: ${description}

        Analyze this idea and provide a JSON response EXACTLY matching this structure:
        {
          "validationScore": number between 1 and 100 representing overall potential,
          "pros": [list of 3 string],
          "cons": [list of 3 string],
          "feedback": "A concise 2 sentence summary feedback."
        }
        Only output the JSON.`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        // Extract JSON carefully
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          validationScore = parsed.validationScore || validationScore;
          analysisResult = {
            pros: parsed.pros || analysisResult.pros,
            cons: parsed.cons || analysisResult.cons,
            feedback: parsed.feedback || analysisResult.feedback
          };
        }
      } catch (aiError) {
        console.error("AI Analysis failed, falling back to mock data:", aiError);
      }
    }

    const newIdea = new Idea({
      title,
      description,
      category,
      targetAudience,
      validationScore,
      analysisResult
    });

    await newIdea.save();

    res.status(201).json({
      success: true,
      data: newIdea
    });

  } catch (error) {
    console.error("Error creating idea:", error);
    res.status(500).json({ success: false, message: "Server error during analysis" });
  }
};

export const getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: ideas });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error fetching ideas" });
  }
};

export const getDashboardAnalytics = async (req, res) => {
  try {
    const ideas = await Idea.find();

    // Calculate dynamic stats based on DB data
    const totalViews = ideas.reduce((acc, curr) => acc + curr.views, 0);
    const totalIdeas = ideas.length;
    const totalSaves = ideas.reduce((acc, curr) => acc + curr.saves, 0);
    const avgScore = totalIdeas > 0 ? Math.round(ideas.reduce((acc, curr) => acc + curr.validationScore, 0) / totalIdeas) : 0;

    // Group by category
    const categoryMap = {};
    ideas.forEach(idea => {
      categoryMap[idea.category] = (categoryMap[idea.category] || 0) + 1;
    });

    const categoryDistribution = Object.keys(categoryMap).map(key => ({
      name: key,
      value: categoryMap[key]
    }));

    res.status(200).json({
      success: true,
      data: {
        overview: [
          { label: "Total Ideas Validated", value: totalIdeas.toString(), trend: "+12.5%", color: "orange" },
          { label: "Saved Ideas", value: totalSaves.toString(), trend: "+4.2%", color: "stone" },
          { label: "Total Views", value: totalViews.toString(), trend: "Hot", color: "orange" },
          { label: "Avg Validation Score", value: avgScore + "%", trend: "+2.1%", color: "green" },
        ],
        categoryDistribution: categoryDistribution.length ? categoryDistribution : [
          { name: 'AI/ML', value: 400 },
          { name: 'SaaS', value: 278 }
        ],
        recentIdeas: ideas.slice(0, 5).map(idea => ({
          id: idea._id,
          title: idea.title,
          category: idea.category,
          score: idea.validationScore,
          time: "Just now" // Simplified for now
        }))
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error fetching analytics" });
  }
};

export const upvoteIdea = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ success: false, message: "User ID required" });

        const idea = await Idea.findById(req.params.id);
        if (!idea) return res.status(404).json({ success: false, message: "Idea not found" });

        if (idea.upvotedBy.includes(userId)) {
            idea.views = Math.max(0, idea.views - 1);
            idea.upvotedBy = idea.upvotedBy.filter(id => id !== userId);
        } else {
            idea.views += 1;
            idea.upvotedBy.push(userId);
            if (idea.downvotedBy.includes(userId)) {
                idea.saves = Math.max(0, idea.saves - 1);
                idea.downvotedBy = idea.downvotedBy.filter(id => id !== userId);
            }
        }
        await idea.save();
        res.status(200).json({ success: true, data: idea });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error upvoting" });
    }
};

export const downvoteIdea = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ success: false, message: "User ID required" });

        const idea = await Idea.findById(req.params.id);
        if (!idea) return res.status(404).json({ success: false, message: "Idea not found" });

        if (idea.downvotedBy.includes(userId)) {
            idea.saves = Math.max(0, idea.saves - 1);
            idea.downvotedBy = idea.downvotedBy.filter(id => id !== userId);
        } else {
            idea.saves += 1;
            idea.downvotedBy.push(userId);
            if (idea.upvotedBy.includes(userId)) {
                idea.views = Math.max(0, idea.views - 1);
                idea.upvotedBy = idea.upvotedBy.filter(id => id !== userId);
            }
        }
        await idea.save();
        res.status(200).json({ success: true, data: idea });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error downvoting" });
    }
};

export const toggleSaveIdea = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ success: false, message: "User ID required" });

        const ideaId = req.params.id;

        let user = await User.findOne({ clerkId: userId });
        if (!user) user = await User.findById(userId);

        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        let saved = false;
        if (user.savedIdeas.includes(ideaId)) {
            user.savedIdeas = user.savedIdeas.filter(id => id.toString() !== ideaId.toString());
        } else {
            user.savedIdeas.push(ideaId);
            saved = true;
        }
        await user.save();

        res.status(200).json({ success: true, saved, savedIdeas: user.savedIdeas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error saving idea" });
    }
};

export const getSavedIdeas = async (req, res) => {
    try {
        const userId = req.params.userId;
        let user = await User.findOne({ clerkId: userId }).populate('savedIdeas');
        if (!user) user = await User.findById(userId).populate('savedIdeas');

        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // Reverse the array to show newest saved first
        res.status(200).json({ success: true, data: user.savedIdeas.reverse() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error fetching saved ideas" });
    }
};
