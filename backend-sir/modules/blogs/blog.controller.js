const blogModel = require("./blog.model");
const { generateSlug } = require("../../utils/textParser");
const { default: slugify } = require("slugify");

const create = (payload) => {
  payload.slug = generateSlug(payload.title);
  return blogModel.create(payload);
};

const list = async (search, page = 1, limit = 5) => {
  const query = [];
  if (search?.title) {
    query.push({
      $match: {
        title: new RegExp(search?.title, "gi"),
      },
    });
  }

  // Lookup author
  query.push(
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $project: {
        author: "$author.name",
        title: 1,
        slug: 1,
        content: 1,
        status: 1,
        duration: 1,
        createdAt: 1,
        updatedAt: 1,
        _id: 1,
        pictureUrl: 1,
      },
    }
  );

  if (search?.author) {
    query.push({
      $match: {
        author: new RegExp(search?.author, "gi"),
      },
    });
  }

  // pagination
  query.push(
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * Number(limit),
          },
          {
            $limit: Number(limit),
          },
        ],
      },
    },
    {
      $addFields: {
        total: {
          $arrayElemAt: ["$metadata.total", 0],
        },
      },
    },
    {
      $project: {
        metadata: 0,
      },
    }
  );
  const result = await blogModel.aggregate(query);

  return {
    data: result[0].data,
    total: result[0].total || 0,
    page: +page,
    limit: +limit,
  };
};

const getAuthorBlogs = async (userId, page = 1, limit = 5) => {
  const query = [];

  if (!userId) throw new Error("User not found");
  query.push({
    $match: {
      author: userId,
    },
  });
  // pagination
  query.push(
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ],
      },
    },
    {
      $addFields: {
        total: {
          $arrayElemAt: ["$metadata.total", 0],
        },
      },
    },
    {
      $project: {
        metadata: 0,
      },
    }
  );

  if (search?.author) {
    query.push({
      $match: {
        author: new RegExp(search?.author, "gi"),
      },
    });
  }
  const result = await blogModel.aggregate(query);
  return {
    data: result[0].data,
    total: result[0].total || 0,
    page: +page,
    limit: +limit,
  };
};

const getPublishedBlogs = async (search, page = 1, limit = 5) => {
  const query = [];
  if (search?.title) {
    query.push({
      $match: {
        title: new RegExp(search?.title, "gi"),
        status: "published",
      },
    });
  }
  // pagination
  query.push(
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $project: {
        author: "$author.name",
        title: 1,
        slug: 1,
        content: 1,
        status: 1,
        duration: 1,
        createdAt: 1,
        updatedAt: 1,
        _id: 1,
        pictureUrl: 1,
      },
    },
    {
      $match: {
        status: "published",
      },
    },
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ],
      },
    },
    {
      $addFields: {
        total: {
          $arrayElemAt: ["$metadata.total", 0],
        },
      },
    },
    {
      $project: {
        metadata: 0,
      },
    }
  );
  if (search?.author) {
    query.push({
      $match: {
        author: new RegExp(search?.author, "gi"),
      },
    });
  }
  const result = await blogModel.aggregate(query);
  return {
    data: result[0].data,
    total: result[0].total || 0,
    page: +page,
    limit: +limit,
  };
};

const getBySlug = async (payload) => {
  const existingBlog = await blogModel.findOne({
    slug: payload.slug,
    status: "published",
  });
  if (!existingBlog) throw new Error("Blog not found");
  return existingBlog;
};

const getById = async (payload) => {
  const blog = await blogModel.findOne({ slug: payload.slug });
  if (!payload.roles.includes("admin")) {
    if (blog.author === payload.author) {
      return blog;
    } else {
      throw new Error("Blog not found");
    }
  }
  return blog;
};

const updateBySlug = async (payload) => {
  const { slug, roles, author, ...rest } = payload;
  // 1. Blog exist ??
  // 2. title change?? => slug change
  // 3. user role,?? ==> only author can change the data
  const blog = await blogModel.findOne({ slug });
  if (!blog) throw new Error("Blog not found");
  if (rest.title) {
    rest.slug = slugify(rest.title);
  }
  if (roles.include("user") && !author === blog.author) {
    throw new Error("Invalid Author");
  }
  return blogModel.updateOne({ _id: blog._id }, rest);
};

const changeStatus = async (slug) => {
  const blog = await blogModel.findOne({ slug });
  if (!blog) throw new Error("Blog not found");
  return await blogModel.findOneAndUpdate(
    { slug },
    { status: blog.status === "draft" ? "published" : "draft" },
    { new: true, upsert: true }
  );
};

module.exports = {
  changeStatus,
  create,
  list,
  getAuthorBlogs,
  getPublishedBlogs,
  getBySlug,
  getById,
  updateBySlug,
};
