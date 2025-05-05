import { CalendarIcon, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type BlogCardProps = {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  slug: string;
};

export function BlogCard({ title, excerpt, date, image, category, slug }: BlogCardProps) {
  return (
    <Card className="flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow">
      {/* Left: Cover Image */}
      <div className="md:w-1/3 h-48 md:h-auto relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-dental-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>

      {/* Right: Content */}
      <div className="flex-1 flex flex-col">
        <CardHeader className="flex justify-between items-start pt-6 pb-3">
          <h3 className="text-2xl font-bold line-clamp-2 hover:text-dental-600 transition-colors">
            <Link to={`/blog/${slug}`}>{title}</Link>
          </h3>
          <MoreHorizontal size={20} className="text-gray-400 cursor-pointer hover:text-gray-600" />
        </CardHeader>

        <CardContent className="pb-3 flex-1">
          <p className="text-gray-600 line-clamp-3">
            {excerpt}
          </p>
        </CardContent>

        <CardFooter className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon size={14} className="mr-1" />
            {date}
          </div>
          <Button
            variant="link"
            asChild
            className="text-dental-600 font-medium p-0 h-auto hover:text-dental-700"
          >
            <Link to={`/blog/${slug}`}>Read More →</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
