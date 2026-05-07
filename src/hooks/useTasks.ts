import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';

export const useTasks = () => {
  const queryClient = useQueryClient();

  // Fetch all tasks
  const { data: tasks = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  // Create task
  const createMutation = useMutation({
    mutationFn: ({ title, description }: { title: string; description?: string }) =>
      createTask(title, description),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  // Toggle complete
  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      updateTask(id, { completed }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  // Delete task
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  return {
    tasks,
    isLoading,
    isError,
    refetch,
    createTask: createMutation.mutate,
    toggleTask: toggleMutation.mutate,
    deleteTask: deleteMutation.mutate,
    isCreating: createMutation.isPending,
  };
};